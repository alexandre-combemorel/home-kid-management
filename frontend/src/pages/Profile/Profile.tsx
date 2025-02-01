import { useAuth } from "../../providers/AuthProvider/AuthProvider"
import { Button, Stack, Text, TextInputV2 } from "@ultraviolet/ui"
import { api } from "../../sdk"
import { useNavigate } from "@tanstack/react-router"

export const Profile = () => {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  const onLogout = async () => {
    try {
      await api.logout()
      setUser(undefined)
      navigate({ to: "/" })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Stack>
      <Stack alignItems="center" gap={3}>
        <Text as={"h1"} variant="headingLargeStrong">
          Profile
        </Text>
        <Stack gap={2}>
          <TextInputV2 label="Email" disabled value={user?.email} />
          <Button onClick={onLogout}>Logout</Button>
        </Stack>
      </Stack>
    </Stack>
  )
}
