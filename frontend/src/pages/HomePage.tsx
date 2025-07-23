import React from 'react'
import { Box, Button, Typography, Container, Paper } from '@mui/material'
import { useAppDispatch } from '../store/hooks'
import { login } from '../store/slices/authSlice'

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch()

  const handleLogin = () => {
    dispatch(login())
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom color="primary">
          Coligo
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom color="text.secondary">
          Welcome to your learning dashboard
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleLogin}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              borderRadius: 2,
            }}
          >
            Login to Dashboard
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
          No password required - just click to enter!
        </Typography>
      </Paper>
    </Container>
  )
}

export default HomePage
