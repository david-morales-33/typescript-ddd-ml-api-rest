import { v4 as uuid } from 'uuid';
import { container } from '../server/Authentication/dependency-inyection/application'
import { UserAuthenticatorByCredentialsQuery } from '../contexts/Authentication/AuthenticationUser/application/AccessByCredentials/UserAuthenticatorByCredentialsQuery';
import { UserAuthenticatorByTokenQueryHandler } from '../contexts/Authentication/AuthenticationUser/application/AccessByToken/UserAuthenticatorByTokenQueryHandler';
import { UserAuthenticatorByTokenQuery } from '../contexts/Authentication/AuthenticationUser/application/AccessByToken/UserAuthenticatorByTokenQuery';

async function query() {
    try {
        const handler = container.get<UserAuthenticatorByTokenQueryHandler>('Authentication.infrastructure.User.UserAuthenticatorByTokenQueryHandler');

        const credentials = new UserAuthenticatorByTokenQuery('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMTQ2NDQxOTI1IiwicHJvZmlsZUlkIjoxLCJpYXQiOjE3Mjk3MTI1OTUsImV4cCI6MTczMjM0MjM5NX0.1eJClc3kb6wDc37R0Cd3NYpcvyslVIPyO1FDReiHat3opL1SR0wM1jlaxReE2oFMSHUaFbr-mJuzuP_052xtBhAoxn4lohhwoSbH8YN22POu_J57skm5c-fQ4sKArNfMFJT3pHqHvQMo47RaZKAHu693kamjuMC9Sr9LLgEfu_7DVbMyg-MAmB6sKDZOo-zkfwte8dfFP42E1suQnLp4qVvt1uoqu6bov6-2PLV7xZOgBGFi5VJj0YA3HDtpc2GCCfRmnpzS6qaDSfY1tpTB1r8v4sYa6k6Yt0Dfi2tBK_clXV0lAomz3Au_NiHizNTLfp0Cc3YJL-BWHJmTVDZnDg')

        const response = await handler.handle(credentials);
        console.log(response)
    } catch (error) { console.log(error) }
}
query();