import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../../../store/authStore'
import { ConversationList } from './ConversationList'
import ChatWindow from './ChatWindow'
import MobileConversationList from './MobileConversationList'
import MobileChatWindow from './MobileChatWindow'
import { useChatStore } from '../../../../store/chatStore'

const ChatTab = () => {
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const [isMobile, setIsMobile] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const { currentConversation, fetchConversations, fetchMessages } = useChatStore()

  // Fetch conversations on mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchConversations()
    }
  }, [isAuthenticated, fetchConversations])

  // Fetch messages when current conversation changes
  useEffect(() => {
    if (currentConversation?.convoId) {
      fetchMessages(currentConversation.convoId)
    }
  }, [currentConversation?.convoId, fetchMessages])

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login')
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile) {
        setShowChat(false) // Reset mobile state when switching to desktop
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isMobile) {
    return (
      <div className="h-full bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.15)_1px,transparent_0)] bg-[length:24px_24px]"></div>
        </div>
        
        {!showChat ? (
          <MobileConversationList onSelectConversation={() => setShowChat(true)} />
        ) : (
          <MobileChatWindow onBack={() => setShowChat(false)} />
        )}
      </div>
    )
  }

  return (
    <div className="flex h-full bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.15)_1px,transparent_0)] bg-[length:24px_24px]"></div>
      </div>
      
      <ConversationList />
      <ChatWindow key={currentConversation?.convoId || 'no-convo'} />
    </div>
  )
}

export default ChatTab