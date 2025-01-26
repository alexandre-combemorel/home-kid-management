import { useNavigate } from "@tanstack/react-router"
import { useAuth } from "../../providers/AuthProvider/AuthProvider"
import { Form, Submit, TextInputFieldV2, useForm } from "@ultraviolet/form"
import { errors } from "../../helpers/errors"
import { Stack, Text, toast } from "@ultraviolet/ui"
import { api } from "../../sdk"
import type { UserType } from "../../providers/AuthProvider/types"
import { useEffect } from "react"

type AuthFormType = {
  email: string
  password: string
}

export const Login = () => {
  const navigate = useNavigate()
  const { setUser, user } = useAuth()
  const methods = useForm<AuthFormType>({
    mode: "onChange",
  })

  const onSubmit = async ({ email, password }: AuthFormType) => {
    try {
      const response = await api.login({ email, password })

      setUser(response.user as UserType)

      toast.success("Hello !")

      navigate({ to: "/" })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (user) {
      navigate({ to: "/" })
    }
  }, [navigate, user])

  return (
    <Form methods={methods} onSubmit={onSubmit} errors={errors}>
      <Stack alignItems="center" gap={3}>
        <Text as={"h1"} variant="headingLargeStrong">
          Login
        </Text>
        <Stack gap={2}>
          <TextInputFieldV2 required label="Email" name="email" type="email" />
          <TextInputFieldV2 required label="Mot de passe" name="password" type="password" />
          <Submit>Valider</Submit>
        </Stack>
      </Stack>
    </Form>
  )
}
