import { CommonModificationEvent } from "../../../../AdministrativeEvent/domain/entities/CommonModificationEvent";
import { EventCreateDate } from "../../../../AdministrativeEvent/domain/value-objects/EventCreateDate";
import { EventDescription } from "../../../../AdministrativeEvent/domain/value-objects/EventDescription";
import { EventId } from "../../../../AdministrativeEvent/domain/value-objects/EventId";
import { EventModifiedField } from "../../../../AdministrativeEvent/domain/value-objects/EventModifiedField";
import { EventNewValue } from "../../../../AdministrativeEvent/domain/value-objects/EventNewValue";
import { EventPreviusValue } from "../../../../AdministrativeEvent/domain/value-objects/EventPreviusValue";
import { AuthUserRepository } from "../../../domain/repositories/AuthUserRepository";
import { UserDescription } from "../../../domain/value-objects/UserDescription";
import { UserId } from "../../../domain/value-objects/UserId";
import { UserIdType } from "../../../domain/value-objects/UserIdType";
import { UserName } from "../../../domain/value-objects/UserName";
import { UserPassword } from "../../../domain/value-objects/UserPassword";
import { UserProfileId } from "../../../domain/value-objects/UserProfileId";
import { UserNotFoundException } from "../../exceptions/UserNotFoundException";

export class UserUpdater {
    constructor(
        private userRepository: AuthUserRepository
    ) { }

    async execute(params: {
        userId: UserId,
        newName: UserName | null,
        newIdType: UserIdType | null,
        newProfileId: UserProfileId | null,
        newDescription: UserDescription | null,
        newPassword: UserPassword | null,
        updateBy: UserId
    }) {
        const { userId, newName, newProfileId, newDescription, newIdType, newPassword, updateBy } = params;

        const user = await this.userRepository.find(userId);

        if (user === undefined || user === null)
            throw new UserNotFoundException(userId);

        const eventId = new EventId(0);
        const eventCreateDate = new EventCreateDate(new Date());
        const eventDescription = new EventDescription('Actualizacion de usuario');

        if (newName) {
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
            const modifiedField = new EventModifiedField('perfil_id');
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
            const modifiedField = new EventModifiedField('contrasena');
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
            const modifiedField = new EventModifiedField('descripcion');
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
            const modifiedField = new EventModifiedField('documento_id');
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

        await this.userRepository.save(user);
    }
}