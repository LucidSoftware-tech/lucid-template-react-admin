import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { Rocket } from 'lucide-react'
import { login } from '../../services/auth.service'
import useAuthStore from '../../store/auth.store'
import { Button, Input } from '../../components/ui'
import { appConfig } from '../../config/navigation'

const schema = z.object({
  email: z.string().min(1, 'Login is required'),
  password: z.string().min(1, 'Password is required')
})

export default function LoginPage() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.setAuth)
  const [error, setError] = useState(null)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: 'a', password: 'a' }
  })

  const onSubmit = async (data) => {
    try {
      setError(null)
      const res = await login(data)
      setAuth(res.user, res.token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="w-full max-w-[380px] rounded-xl border bg-card p-8 shadow-sm">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
          <Rocket className="h-5 w-5" />
        </div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Welcome back</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Sign in to {appConfig.name}</p>
      </div>

      {error && (
        <div className="mb-6 rounded-md bg-red-50 border border-red-200 p-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          {...register('email')}
          error={errors.email?.message}
        />
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium leading-none text-foreground">Password</label>
            <a href="#" className="text-xs font-medium text-primary hover:underline underline-offset-4">
              Forgot password?
            </a>
          </div>
          <Input
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full mt-2">
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <a href="#" className="font-medium text-primary hover:underline underline-offset-4">
          Apply for access
        </a>
      </div>
    </div>
  )
}
