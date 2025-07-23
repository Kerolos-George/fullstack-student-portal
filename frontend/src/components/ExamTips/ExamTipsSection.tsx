import React from 'react'
import { Box, Typography, Button, Paper, styled } from '@mui/material'
import { School as SchoolIcon } from '@mui/icons-material'

const ExamBanner = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: 200,
  position: 'relative',
  overflow: 'hidden',
}))

const ContentSection = styled(Box)(({ theme }) => ({
  flex: 1,
  zIndex: 2,
}))

const IllustrationSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
}))

const FloatingIcon = styled(Box)(({ theme }) => ({
  position: 'absolute',
  backgroundColor: 'rgba(76, 175, 80, 0.1)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const ExamTipsSection: React.FC = () => {
  return (
    <ExamBanner elevation={2}>
      <ContentSection>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 'bold', 
            color: '#1565c0',
            mb: 2,
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}
        >
          EXAMS TIME
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#424242', 
            mb: 1,
            maxWidth: 400
          }}
        >
          Here we are. Are you ready to fight? Don't worry, we prepared some tips to 
          be ready for your exams.
        </Typography>
        
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#757575', 
            mb: 3,
            fontStyle: 'italic'
          }}
        >
          "Nothing happens until something moves" - Albert Einstein
        </Typography>
        
        <Button 
          variant="contained" 
          sx={{
            backgroundColor: '#4caf50',
            '&:hover': {
              backgroundColor: '#45a049',
            },
            borderRadius: 2,
            px: 3,
            py: 1.5,
            textTransform: 'none',
            fontSize: '1rem',
          }}
        >
          View exams tips
        </Button>
      </ContentSection>
      
      <IllustrationSection>
        {/* Floating elements to simulate the illustration */}
        <FloatingIcon 
          sx={{ 
            width: 60, 
            height: 60, 
            top: 20, 
            right: 100,
            backgroundColor: 'rgba(33, 150, 243, 0.1)'
          }}
        >
          📄
        </FloatingIcon>
        
        <FloatingIcon 
          sx={{ 
            width: 80, 
            height: 80, 
            top: 60, 
            right: 20,
            backgroundColor: 'rgba(76, 175, 80, 0.1)'
          }}
        >
          💻
        </FloatingIcon>
        
        <FloatingIcon 
          sx={{ 
            width: 50, 
            height: 50, 
            bottom: 40, 
            right: 80,
            backgroundColor: 'rgba(255, 193, 7, 0.1)'
          }}
        >
          🧮
        </FloatingIcon>
        
        <FloatingIcon 
          sx={{ 
            width: 70, 
            height: 70, 
            bottom: 20, 
            right: 150,
            backgroundColor: 'rgba(156, 39, 176, 0.1)'
          }}
        >
          📊
        </FloatingIcon>
        
        <SchoolIcon 
          sx={{ 
            fontSize: 120, 
            color: 'rgba(33, 150, 243, 0.3)',
            position: 'absolute',
            right: 40,
            top: '50%',
            transform: 'translateY(-50%)',
          }} 
        />
      </IllustrationSection>
    </ExamBanner>
  )
}

export default ExamTipsSection
