/**
 * User Create/Edit Form Page — CRUD Pattern
 *
 * This is a complete example of a form page that your generator
 * can copy and adapt for any entity. It uses:
 * - React Hook Form with Zod validation
 * - shadcn Input, Label, Button, Card, Select primitives
 * - React Query mutation hooks
 */
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/Card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: { name: '', email: '', role: '' },
  })

  const currentRole = watch('role')

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
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                {...register('name')}
                className={errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}
              />
              {errors.name && (
                <p className="text-xs font-medium text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
              />
              {errors.email && (
                <p className="text-xs font-medium text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="role">Role</Label>
              <Select
                value={currentRole}
                onValueChange={(val) => setValue('role', val, { shouldValidate: true })}
              >
                <SelectTrigger className={errors.role ? 'border-destructive focus:ring-destructive' : ''}>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-xs font-medium text-destructive">{errors.role.message}</p>
              )}
            </div>

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
