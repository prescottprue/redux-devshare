import { CALL_DEVSHARE, Schemas } from '../middleware'
export const GET_PROJECTS_REQUEST = 'GET_PROJECTS_REQUEST'
export const GET_PROJECTS_SUCCESS = 'GET_PROJECTS_SUCCESS'
export const GET_PROJECTS_FAILURE = 'GET_PROJECTS_FAILURE'

export function getProjects (username) {
  if (!username) {
    console.error({ description: 'Username is required to get projects.' })
    return {type: GET_PROJECTS_FAILURE, payload: {message: 'Username is required to get projects.'}}
  }
  return {
    [CALL_DEVSHARE]: {
      types: [ GET_PROJECTS_REQUEST, GET_PROJECTS_SUCCESS, GET_PROJECTS_FAILURE ],
      model: 'projects',
      modelArgs: username,
      method: 'get',
      schema: Schemas.PROJECT_ARRAY
    }
  }
}

export const GET_PROJECT_REQUEST = 'GET_PROJECT_REQUEST'
export const GET_PROJECT_SUCCESS = 'GET_PROJECT_SUCCESS'
export const GET_PROJECT_FAILURE = 'GET_PROJECT_FAILURE'

export function getProject (username, projectname) {
  if (!username || !projectname) {
    console.error({ description: 'Project owner and name are required to get project.' })
    return { type: GET_PROJECT_FAILURE, payload: { message: 'Project owner and name are required to get project.' } }
  }
  return {
    [CALL_DEVSHARE]: {
      types: [ GET_PROJECT_REQUEST, GET_PROJECT_SUCCESS, GET_PROJECT_FAILURE ],
      model: 'project',
      modelArgs: [ projectname, username ],
      method: 'get',
      schema: Schemas.PROJECT
    }
  }
}
export const ADD_PROJECT_REQUEST = 'ADD_PROJECT_REQUEST'
export const ADD_PROJECT_SUCCESS = 'ADD_PROJECT_SUCCESS'
export const ADD_PROJECT_FAILURE = 'ADD_PROJECT_FAILURE'

export function addProject (name, username) {
  if (!username || !name) {
    console.error({ description: 'Project owner and name are required to get project.' })
    return { type: ADD_PROJECT_FAILURE, payload: { message: 'Project owner and name are required to get project.' } }
  }
  return {
    [CALL_DEVSHARE]: {
      types: [ ADD_PROJECT_REQUEST, ADD_PROJECT_SUCCESS, ADD_PROJECT_FAILURE ],
      model: 'projects',
      modelArgs: [ username ],
      method: 'add',
      methodData: [{ name }],
      schema: Schemas.PROJECT
    }
  }
}

export const UPDATE_PROJECT_REQUEST = 'UPDATE_PROJECT_REQUEST'
export const UPDATE_PROJECT_SUCCESS = 'UPDATE_PROJECT_SUCCESS'
export const UPDATE_PROJECT_FAILURE = 'UPDATE_PROJECT_FAILURE'

export function updateProject (project, data) {
  if (!project) {
    console.error({ description: 'Project data is required to update project.' })
    return { type: UPDATE_PROJECT_FAILURE, payload: { message: 'Project data is required to update project.' } }
  }
  return {
    [CALL_DEVSHARE]: {
      types: [ UPDATE_PROJECT_REQUEST, UPDATE_PROJECT_SUCCESS, UPDATE_PROJECT_FAILURE ],
      model: 'Project',
      modelArgs: [ project.name, project.owner.username ],
      method: 'update',
      methodData: data,
      schema: Schemas.PROJECT
    }
  }
}

export const DELETE_PROJECT_REQUEST = 'DELETE_PROJECT_REQUEST'
export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS'
export const DELETE_PROJECT_FAILURE = 'DELETE_PROJECT_FAILURE'

export function deleteProject (project) {
  if (!project) {
    console.error({ description: 'Project data is required to delete project.' })
    return {type: DELETE_PROJECT_FAILURE, payload: {message: 'Project data is required to delete project.'}}
  }
  return {
    [CALL_DEVSHARE]: {
      types: [ DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, DELETE_PROJECT_FAILURE ],
      model: 'project',
      modelArgs: [ project.name, project.owner.username ],
      method: 'remove',
      schema: Schemas.PROJECT
    }
  }
}

export const ADD_COLLABORATOR_REQUEST = 'ADD_COLLABORATOR_REQUEST'
export const ADD_COLLABORATOR_SUCCESS = 'ADD_COLLABORATOR_SUCCESS'
export const ADD_COLLABORATOR_FAILURE = 'ADD_COLLABORATOR_FAILURE'

export function addCollaborator (project, user) {
  if (!user) {
    console.error({ description: 'Collaborator should have user specified.' })
    return {type: ADD_COLLABORATOR_FAILURE, payload: {message: 'Collaborator should have user specified.'}}
  }
  return {
    [CALL_DEVSHARE]: {
      types: [ ADD_COLLABORATOR_REQUEST, ADD_COLLABORATOR_SUCCESS, ADD_COLLABORATOR_FAILURE ],
      model: 'project',
      modelArgs: [ project.name, project.owner.username ],
      method: 'addCollaborator',
      methodData: [ user ],
      schema: Schemas.PROJECT
    }
  }
}

export const REMOVE_COLLABORATOR_REQUEST = 'REMOVE_COLLABORATOR_REQUEST'
export const REMOVE_COLLABORATOR_SUCCESS = 'REMOVE_COLLABORATOR_SUCCESS'
export const REMOVE_COLLABORATOR_FAILURE = 'REMOVE_COLLABORATOR_FAILURE'

export function removeCollaborator (project, user) {
  if (!user) {
    console.error({ description: 'Collaborator should have user specified.' })
    return { type: REMOVE_COLLABORATOR_FAILURE, payload: { message: 'Collaborator should have user specified.' } }
  }
  return {
    [CALL_DEVSHARE]: {
      types: [ REMOVE_COLLABORATOR_REQUEST, REMOVE_COLLABORATOR_SUCCESS, REMOVE_COLLABORATOR_FAILURE ],
      model: 'project',
      modelArgs: [ project.name, project.owner.username ],
      method: 'removeCollaborator',
      methodData: [ user ],
      schema: Schemas.PROJECT
    }
  }
}
