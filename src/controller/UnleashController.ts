import {Request, Response} from 'express';
import {isEnabled, Context} from 'unleash-client';
import {uuid} from 'uuidv4';

export default {

  async index(request: Request, response: Response) {
    //config.get('unleash').session_cookie_name;
    const sessionCookieName = 'unleash.session_cookie_name';
    console.log('request query', request.query)
    const { userId} = request.query as any;

    let sessionId = request.cookies && request.cookies[sessionCookieName];
    
    if (!sessionId) {
        sessionId = uuid();
        response.cookie(sessionCookieName, sessionId)
    }
    const context = setUnleashContext(sessionId, userId)
    return response.send(getAllFeatureToggles(context))
  },
}

function getFeatureToggle (context: Context) {
  return (obj:{ [key: string]: {} }, feature:string) => {
    console.log('context', context)
    obj[feature] = {'isEnabled': isEnabled(feature, context)};
    return obj
  }
}

function getAllFeatureToggles(context: Context) {
  // config.get('feature_toggles')
  const allFeatureToggles = ['demo_feature_toggle', 'lle.station.id', 'HeroCategoryBanners-Desktop'];
  return allFeatureToggles.reduce(getFeatureToggle(context), {})
}

function setUnleashContext(sessionId: string, userId: string):Context {
  const context = {
    sessionId: sessionId,
    userId: userId
  }
  return context
}