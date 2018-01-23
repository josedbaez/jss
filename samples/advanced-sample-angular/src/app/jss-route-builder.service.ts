import { environment as env } from '../environments/environment';

export class JssRoute {
    language: string;
    serverRoute: string;
}

export class JssRouteBuilderService {

    buildRouteUrl(route: JssRoute) {
        if (!route.language) {
            route.language = env.defaultLanguage;
        }
        if (!route.serverRoute) {
            route.serverRoute = env.defaultServerRoute;
        }
        return `/${route.language}${route.serverRoute}`;
    }

    parseRouteUrl(url: string[]): JssRoute {
        const route = new JssRoute();
        route.language = env.defaultLanguage;
        route.serverRoute = env.defaultServerRoute;

        if (url.length === 0) {
            return route;
        }

        const languageRegex = /^[a-zA-Z]{2}(-[a-zA-Z]{2})?$/;
        const languageSegment = url[0].toString();

        if (languageSegment.match(languageRegex)) {
            route.language = languageSegment;
            route.serverRoute = url.length > 1 ? url.slice(1).join('/') : env.defaultServerRoute;
        } else {
            route.serverRoute = url.join('/');
        }
        if (!route.serverRoute.startsWith('/')) {
            route.serverRoute = '/' + route.serverRoute;
        }

        return route;
    }

}
