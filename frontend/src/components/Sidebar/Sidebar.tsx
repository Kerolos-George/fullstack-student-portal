import React, { useState } from 'react'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  Schedule as ScheduleIcon,
  MenuBook as CoursesIcon,
  Grade as GradebookIcon,
  TrendingUp as PerformanceIcon,
  Campaign as AnnouncementIcon,
} from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 240,
  backgroundColor: '#2c5aa0',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}))

const LogoContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 2),
  backgroundColor: '#1e4080',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  margin: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(1),
  '&:hover': {
    backgroundColor: 'white',
    '& .MuiListItemIcon-root': {
      color: '#2c5aa0',
    },
    '& .MuiListItemText-primary': {
      color: '#2c5aa0',
    },
  },
  '&.Mui-selected': {
    backgroundColor: 'white',
    '& .MuiListItemIcon-root': {
      color: '#2c5aa0',
    },
    '& .MuiListItemText-primary': {
      color: '#2c5aa0',
    },
    '&:hover': {
      backgroundColor: 'white',
      '& .MuiListItemIcon-root': {
        color: '#2c5aa0',
      },
      '& .MuiListItemText-primary': {
        color: '#2c5aa0',
      },
    },
  },
}))

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, id: 'dashboard', path: '/dashboard' },
  { text: 'Schedule', icon: <ScheduleIcon />, id: 'schedule', path: '/schedule' },
  { text: 'Courses', icon: <CoursesIcon />, id: 'courses', path: '/courses' },
  { text: 'Gradebook', icon: <GradebookIcon />, id: 'gradebook', path: '/gradebook' },
  { text: 'Performance', icon: <PerformanceIcon />, id: 'performance', path: '/performance' },
  { text: 'Announcement', icon: <AnnouncementIcon />, id: 'announcement', path: '/announcements' },
]

const Sidebar: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState('dashboard')
  const navigate = useNavigate()
  const location = useLocation()

  const handleItemClick = (itemId: string) => {
    setSelectedItem(itemId)
    const menuItem = menuItems.find(item => item.id === itemId)
    if (menuItem?.path) {
      navigate(menuItem.path)
    }
  }

  return (
    <SidebarContainer>
      <LogoContainer>
        <Typography variant="h5" component="h1" fontWeight="bold">
          Coligo
        </Typography>
      </LogoContainer>
      
      <List sx={{ flexGrow: 1, pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <StyledListItemButton
              selected={selectedItem === item.id}
              onClick={() => handleItemClick(item.id)}
            >
              <ListItemIcon sx={{ color: 'rgba(255, 255, 255, 0.7)', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '0.95rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                }}
              />
            </StyledListItemButton>
          </ListItem>
        ))}
      </List>
    </SidebarContainer>
  )
}

export default Sidebar
