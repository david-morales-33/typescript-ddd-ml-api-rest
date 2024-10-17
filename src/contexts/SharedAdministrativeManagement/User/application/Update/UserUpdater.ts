import { Uuid } from "../../../../Shared/domain/value-object/Uuid";
import { UserCommandRepository } from "../../domain/repositories/UserCommandRepository";
import { UserIdType } from "../../../../Shared/domain/value-object/UserIdType";
import { UserNotFoundException } from "../../../../Shared/domain/exceptions/UserNotFoundException";
import { UserId } from "../../../../Shared/domain/value-object/UserId";
import { UserName } from "../../../../Shared/domain/value-object/UserName";
import { UserProfileId } from "../../../../Shared/domain/value-object/UserProfileId";
import { UserDescription } from "../../../../Shared/domain/value-object/UserDescription";
import { UserPassword } from "../../domain/value-objets/UserPassword";
import { UserState } from "../../../../Shared/domain/value-object/UserState";
import { UserAuthQueryRepository } from "../../domain/repositories/UserAuthQueryRepository";
import { EventCreateDate } from "../../../../Shared/domain/value-object/EventCreateDate";
import { EventDescription } from "../../../../Shared/domain/value-object/EventDescription";
import { EventId } from "../../../../Shared/domain/value-object/EventId";
import { EventModifiedField } from "../../../../Shared/domain/value-object/EventModifiedField";
import { EventPreviusValue } from "../../../../Shared/domain/value-object/EventPreviusValue";
import { EventNewValue } from "../../../../Shared/domain/value-object/EventNewValue";
import { CommonModificationEvent } from "../../../../Shared/domain/entities/CommonModificationEvent";

export class UserUpdater {
    constructor(
        private userQueryRepository: UserAuthQueryRepository,
        private userCommandRepository: UserCommandRepository
    ) { }

    async execute(params: {
        userId: UserId,
        newName: UserName | null,
        newIdType: UserIdType | null,
        newProfileId: UserProfileId | null,
        newDescription: UserDescription | null,
        newPassword: UserPassword | null,
        newState: UserState | null,
        updateBy: UserId
    }) {
        const { userId, newName, newProfileId, newDescription, newIdType, newPassword, updateBy, newState } = params;

        const user = await this.userQueryRepository.find(userId);

        if (user === undefined || user === null)
            throw new UserNotFoundException(userId);

        const eventCreateDate = new EventCreateDate(new Date());
        const eventDescription = new EventDescription('Actualizacion de usuario');

        if (newName) {
            const eventId = new EventId(Uuid.random().value);
            const modifiedField = new EventModifiedField('nombre');
            const previusValue = new EventPreviusValue(user.name.value);
            const newValue = new EventNewValue(newName.value);
            const event = CommonModificationEvent.create(
                eventId,
                updateBy,
                eventCreateDate,
                eventDescription,
                modifiedField,
                previusValue,
                newValue
            );
            user.updateUserName({
                value: newName,
                event
            })
        }

        if (newProfileId) {
            const eventId = new EventId(Uuid.random().value);
            const modifiedField = new EventModifiedField('perfil');
            const previusValue = new EventPreviusValue(user.profileId.value.toString());
            const newValue = new EventNewValue(newProfileId.value.toString());

            const event = CommonModificationEvent.create(
                eventId,
                updateBy,
                eventCreateDate,
                eventDescription,
                modifiedField,
                previusValue,
                newValue
            );
            user.updateUserProfileId({
                value: newProfileId,
                event
            })
        }

        if (newPassword) {
            const eventId = new EventId(Uuid.random().value);
            const modifiedField = new EventModifiedField('contraseña');
            const previusValue = new EventPreviusValue(user.password.value);
            const newValue = new EventNewValue(newPassword.value);

            const event = CommonModificationEvent.create(
                eventId,
                updateBy,
                eventCreateDate,
                eventDescription,
                modifiedField,
                previusValue,
                newValue
            );
            user.updateUserPassword({
                value: newPassword,
                event
            })
        }

        if (newDescription) {
            const eventId = new EventId(Uuid.random().value);
            const modifiedField = new EventModifiedField('descripción');
            const previusValue = new EventPreviusValue(user.description.value);
            const newValue = new EventNewValue(newDescription.value);

            const event = CommonModificationEvent.create(
                eventId,
                updateBy,
                eventCreateDate,
                eventDescription,
                modifiedField,
                previusValue,
                newValue
            );
            user.updateUserDescription({
                value: newDescription,
                event
            })
        }

        if (newIdType) {
            const eventId = new EventId(Uuid.random().value);
            const modifiedField = new EventModifiedField('Tipo de documento');
            const previusValue = new EventPreviusValue(user.idType.value.toString());
            const newValue = new EventNewValue(newIdType.value.toString());

            const event = CommonModificationEvent.create(
                eventId,
                updateBy,
                eventCreateDate,
                eventDescription,
                modifiedField,
                previusValue,
                newValue
            );
            user.updateUserIdType({
                value: newIdType,
                event
            })
        }
        if(newState){
            const eventId = new EventId(Uuid.random().value);
            const modifiedField = new EventModifiedField('Estado');
            const previusValue = new EventPreviusValue(user.state.value?'Habilitado':'Deshabilitado');
            const newValue = new EventNewValue(newState.value?'Habilitado':'Deshabilitado');
            const event = CommonModificationEvent.create(
                eventId,
                updateBy,
                eventCreateDate,
                eventDescription,
                modifiedField,
                previusValue,
                newValue
            );
            user.updateUserState({
                value: newState,
                event
            })
        }

        await this.userCommandRepository.save(user);
    }
}