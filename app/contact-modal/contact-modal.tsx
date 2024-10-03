'use client'

import React from 'react'
import { Dialog } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/text-area'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Contact the Owner</h2>
        <form>
          <div className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" name="name" />
          </div>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" name="email" />
          </div>
          <div className="mb-4">
            <Label htmlFor="phone">Phone Number</Label>
            <Input type="tel" id="phone" name="phone" />
          </div>
          <div className="mb-4">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" onClick={onClose}>Close</Button>
            <Button type="submit">Send</Button>
          </div>
        </form>
      </div>
    </Dialog>
  )
}

export default ContactModal