import React, { useState } from 'react'
import { Rating } from '@/components/reui/rating'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postComplaintFeedback } from '@/api/complaints.api'
import { getErrorToast, getSuccessToast } from '@/utils/helpers'
import { useLanguage } from '@/context/LanguageContext'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { MessageSquare, Send, CheckCircle2 } from 'lucide-react'

interface ComplaintFeedbackProps {
  complaintId: string;
  existingRating?: number;
  existingFeedback?: string;
  t: any,
  setSelected?:any
}

const ComplaintFeedback = ({ complaintId, existingRating, existingFeedback, t, setSelected }: ComplaintFeedbackProps) => {
//   const { t } = useLanguage()
  const queryClient = useQueryClient()
  const [rating, setRating] = useState(existingRating || 0)
  const [feedback, setFeedback] = useState(existingFeedback || '')

  const isAlreadySubmitted = typeof existingRating === 'number' && existingRating > 0

  const mutation = useMutation({
    mutationFn: () => postComplaintFeedback({ id: complaintId, data: { rating, feedbackText: feedback } }),
    onSuccess: () => {
      getSuccessToast(t('Feedback submitted successfully', 'प्रतिक्रिया सफलतापूर्वक सबमिट की गई'))
      queryClient.invalidateQueries({ queryKey: ['grievance'] })
      setSelected && setSelected((prev :any)=> ({...prev, rating, feedbackText: feedback }))
    },
    onError: (err: any) => {
      getErrorToast(err)
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      getErrorToast({ message: t('Please select a rating before submitting', 'कृपया सबमिट करने से पहले रेटिंग चुनें') })
      return
    }
    mutation.mutate()
  }

  if (isAlreadySubmitted) {
    return (
      <div className="mt-6 p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-3">
        <div className="flex items-center gap-2 text-emerald-800 font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>{t('Feedback Submitted', 'प्रतिक्रिया सबमिट की गई')}</span>
        </div>
        <div className="space-y-2 text-sm text-emerald-950">
          <div className="flex items-center gap-2">
            <span className="font-medium text-emerald-800">{t('Rating', 'रेटिंग')}:</span>
            <Rating  rating={existingRating} editable={false} showValue={true} />
          </div>
          {existingFeedback && (
            <div>
              <span className="font-medium text-emerald-800">{t('Comments', 'टिप्पणियाँ')}:</span>
              <p className="mt-1 p-3 bg-white rounded-lg border border-emerald-100 text-foreground italic">
                "{existingFeedback}"
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="mt-6 p-4 bg-white border border-border rounded-xl space-y-4">
      <div className="flex items-center gap-2 font-semibold text-foreground">
        <MessageSquare className="w-5 h-5 text-primary" />
        <h3>{t('Rate Resolution Experience', 'समाधान अनुभव को रेट करें')}</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="mb-2 block text-sm font-medium text-muted-foreground">
            {t('How satisfied are you with the resolution? *', 'आप समाधान से कितने संतुष्ट हैं? *')}
          </Label>
          <Rating
            rating={rating}
            editable={true}
            onRatingChange={(val) => setRating(val)}
            showValue={true}
            size="lg"
            className="py-1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="feedback-textarea" className="text-sm font-medium text-muted-foreground">
            {t('Your Comments / Suggestions *', 'आपकी टिप्पणियाँ / सुझाव *')}
          </Label>
          <Textarea
            id="feedback-textarea"
            placeholder={t(
              'Share your thoughts on the resolution or officer\'s conduct...',
              'समाधान या अधिकारी के आचरण पर अपने विचार साझा करें...'
            )}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            rows={3}
            className="resize-none"
          />
        </div>

        <Button
          type="submit"
          disabled={rating === 0 || !feedback.trim() || mutation.isPending}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {mutation.isPending ? (
            <span className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          {t('Submit Feedback', 'प्रतिक्रिया सबमिट करें')}
        </Button>
      </form>
    </div>
  )
}

export default ComplaintFeedback