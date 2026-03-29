/**
 * Users React Query Hooks
 *
 * This is the PATTERN your generator copies for every new entity.
 * Replace "users"/"user" with the entity name.
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as usersService from '../services/users.service'

const QUERY_KEY = 'users'

export function useUsers(params) {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => usersService.getUsers(params),
  })
}

export function useUser(id) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => usersService.getUser(id),
    enabled: !!id,
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: usersService.createUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => usersService.updateUser(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: usersService.deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}
