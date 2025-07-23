import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Avatar,
  Badge,
  Box,
  styled,
  alpha,
} from '@mui/material'
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Mail as MailIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { logout } from '../../store/slices/authSlice'

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'white',
  color: '#333',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  zIndex: theme.zIndex.drawer + 1,
}))

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha('#f5f5f5', 0.8),
  '&:hover': {
    backgroundColor: alpha('#f5f5f5', 1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#999',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

const Header: React.FC = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#333' }}>
          Welcome {user?.name},
        </Typography>
        
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton size="large" color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon sx={{ color: '#4caf50' }} />
            </Badge>
          </IconButton>
          
          <IconButton size="large" color="inherit">
            <Badge badgeContent={2} color="error">
              <MailIcon sx={{ color: '#4caf50' }} />
            </Badge>
          </IconButton>

          <IconButton onClick={handleLogout} size="large" color="inherit" title="Logout">
            <LogoutIcon sx={{ color: '#666' }} />
          </IconButton>

          <Avatar
            alt={user?.name}
            src={user?.avatar}
            sx={{ width: 40, height: 40, ml: 1 }}
          >
            {user?.name?.charAt(0)}
          </Avatar>
        </Box>
      </Toolbar>
    </StyledAppBar>
  )
}

export default Header
