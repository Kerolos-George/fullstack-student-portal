import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Chip,
  Button,
  styled,
  Divider,
  CircularProgress,
} from '@mui/material'
import { Person as PersonIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { apiService, Announcement } from '../../services/api'

const AnnouncementCard = styled(Paper)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
}))

const AnnouncementItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  '&:not(:last-child)': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}))

const AnnouncementsSection: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true)
        const data = await apiService.getAnnouncements()
        setAnnouncements(data.slice(0, 4)) // Limit to 4 announcements
        setError(null)
      } catch (err) {
        console.error('Failed to fetch announcements:', err)
        setError('Failed to load announcements')
        // Fallback to mock data if API fails
        setAnnouncements([
          {
            _id: '1',
            authorName: 'Mr. Ahmed Mostafa',
            authorRole: 'Teacher',
            course: 'Physics',
            message: 'Hi my friends! I just want you to be ready to get started and focus on preparing assignments to get the best marks and be ready for your exams! 😊',
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
            updatedAt: new Date().toISOString(),
          },
          {
            _id: '2',
            authorName: 'Mrs. Salma Ahmed',
            authorRole: 'Teacher',
            course: 'Math',
            message: 'Hello my students, I want to announce that the exam date got delayed 3 days ahead. So you have more time to study and prepare. Best of luck for you all! 📚',
            createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
            updatedAt: new Date().toISOString(),
          },
          {
            _id: '3',
            authorName: 'Dr. Sarah Johnson',
            authorRole: 'Teacher',
            course: 'Chemistry',
            message: 'Reminder: Lab session tomorrow at 10 AM. Please bring your lab coats and safety goggles. We will be working with acids.',
            createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
            updatedAt: new Date().toISOString(),
          },
          {
            _id: '4',
            authorName: 'Prof. Michael Brown',
            authorRole: 'Teacher',
            course: 'Biology',
            message: 'Great job on the recent presentations! I am impressed with your understanding of cellular biology. Keep up the excellent work!',
            createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
            updatedAt: new Date().toISOString(),
          },
        ].slice(0, 4)) // Limit to 4 announcements
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncements()
  }, [])

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
  }

  return (
    <AnnouncementCard elevation={1}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: '#333' }}>
          Announcements
        </Typography>
        <Button 
          variant="text" 
          size="small" 
          sx={{ 
            color: '#4caf50',
            textTransform: 'none',
            fontWeight: 'bold'
          }}
          onClick={() => navigate('/announcements')}
        >
          All
        </Button>
      </Box>

      <Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={40} />
          </Box>
        ) : error ? (
          <Typography variant="body2" color="error" sx={{ textAlign: 'center', py: 2 }}>
            {error}
          </Typography>
        ) : (
          announcements.map((announcement, index) => (
            <AnnouncementItem key={announcement._id}>
              <Avatar
                sx={{ 
                  width: 48, 
                  height: 48,
                  backgroundColor: index % 2 === 0 ? '#e3f2fd' : '#f3e5f5'
                }}
              >
                <PersonIcon sx={{ color: index % 2 === 0 ? '#1976d2' : '#7b1fa2' }} />
              </Avatar>
              
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#333' }}>
                    {announcement.authorName}
                  </Typography>
                  <Chip 
                    label={announcement.course || announcement.authorRole}
                    size="small"
                    sx={{ 
                      backgroundColor: '#e8f5e8',
                      color: '#2e7d32',
                      fontSize: '0.75rem',
                      height: 20,
                    }}
                  />
                </Box>
                
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#666', 
                    mb: 1,
                    lineHeight: 1.5
                  }}
                >
                  {announcement.message}
                </Typography>
                
                <Typography variant="caption" sx={{ color: '#999' }}>
                  {formatTimeAgo(announcement.createdAt)}
                </Typography>
              </Box>
            </AnnouncementItem>
          ))
        )}
      </Box>
    </AnnouncementCard>
  )
}

export default AnnouncementsSection
