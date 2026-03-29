/**
 * Users API Service
 *
 * This is the PATTERN your generator copies for every new entity.
 * Replace "users" with the entity name (e.g., products, orders, invoices).
 */
import client from '../../../api/client'

const BASE = '/users'

export const getUsers = (params) =>
  client.get(BASE, { params }).then((r) => r.data)

export const getUser = (id) =>
  client.get(`${BASE}/${id}`).then((r) => r.data)

export const createUser = (data) =>
  client.post(BASE, data).then((r) => r.data)

export const updateUser = (id, data) =>
  client.put(`${BASE}/${id}`, data).then((r) => r.data)

export const deleteUser = (id) =>
  client.delete(`${BASE}/${id}`).then((r) => r.data)
