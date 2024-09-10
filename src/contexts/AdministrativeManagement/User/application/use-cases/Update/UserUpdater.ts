import { CommonModificationEvent } from "../../../../AdministrativeEvent/domain/entities/CommonModificationEvent";
import { EventCreateDate } from "../../../../AdministrativeEvent/domain/value-objects/EventCreateDate";
import { EventDescription } from "../../../../AdministrativeEvent/domain/value-objects/EventDescription";
import { EventId } from "../../../../AdministrativeEvent/domain/value-objects/EventId";
import { EventModifiedField } from "../../../../AdministrativeEvent/domain/value-objects/EventModifiedField";
import { EventNewValue } from "../../../../AdministrativeEvent/domain/value-objects/EventNewValue";
import { EventPreviusValue } from "../../../../AdministrativeEvent/domain/value-objects/EventPreviusValue";
import { UserAuthQueryRepository } from "../../../domain/repositories/UserAuthQueryRepository";
import { UserCommandRepository } from "../../../domain/repositories/UserCommandRepository";
import { UserDescription } from "../../../domain/value-objects/UserDescription";
import { UserId } from "../../../domain/value-objects/UserId";
import { UserIdType } from "../../../domain/value-objects/UserIdType";
import { UserName } from "../../../domain/value-objects/UserName";
import { UserPassword } from "../../../domain/value-objects/UserPassword";
import { UserProfileId } from "../../../domain/value-objects/UserProfileId";
import { UserState } from "../../../domain/value-objects/UserState";
import { UserNotFoundException } from "../../exceptions/UserNotFoundException";

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
            const eventId = new EventId(1);
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
            const eventId = new EventId(2);
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
            const eventId = new EventId(3);
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
            const eventId = new EventId(4);
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
            const eventId = new EventId(5);
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
            const eventId = new EventId(6);
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