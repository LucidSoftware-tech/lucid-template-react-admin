import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { Rocket } from 'lucide-react'
import { login } from '@/services/auth.service'
import useAuthStore from '@/store/auth.store'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/Card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { appConfig } from '@/config/navigation'

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
    <Card className="w-full max-w-[380px] shadow-sm">
      <CardHeader className="text-center pb-2">
        <div className="mb-4 flex justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Rocket className="h-5 w-5" />
          </div>
        </div>
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>Sign in to {appConfig.name}</CardDescription>
      </CardHeader>

      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              {...register('email')}
              className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
            />
            {errors.email && (
              <p className="text-xs font-medium text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-xs font-medium text-primary hover:underline underline-offset-4">
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              {...register('password')}
              className={errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}
            />
            {errors.password && (
              <p className="text-xs font-medium text-destructive">{errors.password.message}</p>
            )}
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
      </CardContent>
    </Card>
  )
}
