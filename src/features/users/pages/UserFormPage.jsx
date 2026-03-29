/**
 * User Create/Edit Form Page — CRUD Pattern
 *
 * This is a complete example of a form page that your generator
 * can copy and adapt for any entity. It uses:
 * - React Hook Form with Zod validation
 * - Input/Button UI primitives
 * - React Query mutation hooks
 */
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Input, Card, CardContent } from '../../../components/ui'
import { useUser, useCreateUser, useUpdateUser } from '../hooks/useUsers'
import { useEffect } from 'react'

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  role: z.string().min(1, 'Role is required'),
})

export default function UserFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id

  const { data: user } = useUser(id)
  const createMutation = useCreateUser()
  const updateMutation = useUpdateUser()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: { name: '', email: '', role: '' },
  })

  useEffect(() => {
    if (user) reset(user)
  }, [user, reset])

  const onSubmit = async (data) => {
    if (isEdit) {
      await updateMutation.mutateAsync({ id, data })
    } else {
      await createMutation.mutateAsync(data)
    }
    navigate('/users')
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          {isEdit ? 'Edit User' : 'Create User'}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {isEdit ? 'Update user information' : 'Add a new user to the system'}
        </p>
      </div>

      <Card className="max-w-lg">
        <CardContent className="pt-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Full Name"
              {...register('name')}
              error={errors.name?.message}
            />
            <Input
              label="Email"
              type="email"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              label="Role"
              {...register('role')}
              error={errors.role?.message}
              placeholder="e.g. admin, editor, viewer"
            />

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : isEdit ? 'Update' : 'Create'}
              </Button>
              <Button variant="outline" type="button" onClick={() => navigate('/users')}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
