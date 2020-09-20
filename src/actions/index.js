import axios from 'axios'

export function fetchUser() {
  return new Promise(res => {
    setTimeout(() => res({ name: 'John Doe' }), 2000)
  })
}

export async function fetchResources() {
  const res = await axios.get('/api/resources')
  return res.data
}

export async function fetchResourceByIdApi(resourceId) {
  const res = await axios.get(`/api/resources/${resourceId}`)
  return res.data
}

export async function createResourceApi(resource) {
  try {
    const res = await axios.post(`/api/resources`, resource)
    return res.data
  } catch (error) {
    return Promise.reject(error?.response?.data)
  }
}

export async function updateResourceApi(id, resource) {
  try {
    const res = await axios.patch(`/api/resources/${id}`, resource)
    return res.data
  } catch (error) {
    return await Promise.reject(error?.response?.data)
  }
}

export async function deleteResourceApi(id) {
  try {
    const res = await axios.delete(`/api/resources/${id}`)
    return res.data
  } catch (error) {
    return await Promise.reject(error?.response?.data)
  }
}

export async function searchResourcesApi(title) {
  const res = await axios.get(`/api/resources/s/${title}`)
  return res.data
}
