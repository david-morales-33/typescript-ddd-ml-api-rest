import { WebServiceUser } from '../../../../contexts/SharedAdministrativeManagement/User/infrastructure/Services/WebService/WebServiceUser'
import { container } from '../application'

container.
    register('SharedAdministrativeManagement.infrastructure.services.WebServiceUser', WebServiceUser)