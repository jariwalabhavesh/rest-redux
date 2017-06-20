import React from 'react'
import thunk from 'redux-thunk'
import _ from 'lodash'
import 'whatwg-fetch'

import _createReducer from './createReducer'
import ModelActions from './ModelActions'


export default class Wrapper {
  config
  loopback
  constructor(_config) {
    this.config = _config
    const {models} = this.config
    console.log('config set: ', this.config)
    this.reducer = _createReducer(models)
    this.middleware = thunk
    this._models = _.keyBy(_.map(models, model => ({ 
      modelName: model.modelName, 
      actions: new ModelActions(model, this.config),
      selectors: null 
    })), 'modelName')
  }

  get(modelName) {
    return this._models[modelName]
  } 
  // createActions (modelName, _config) {
  //   return new ModelActions(modelName, _.merge({}, this.config, _config))
  // }

}

export const connectModel = (model, filter) => (Component) =>{
  //const actions = createActions(model)
  // QUESTION:?? Get filtered action here const instances = actions.find()
  return class ModelComponent extends React.Component {
    render() {
      return <Component {...this.props} /> 
      // restActions={actions}
    }
  }
}


