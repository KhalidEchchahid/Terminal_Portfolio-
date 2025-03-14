import { Button } from "@/components/ui/button"

export default function ContactForm() {
  return (
    <div className="bg-terminal-header p-6 rounded-lg">
      <h3 className="text-lg font-bold text-terminal-yellow mb-4">Send Me a Message</h3>

      <form className="space-y-4">
        <div>
          <label className="block text-terminal-text-dim mb-1">Name</label>
          <input
            type="text"
            className="w-full bg-terminal-bg border border-terminal-border rounded px-3 py-2 focus:outline-none focus:border-terminal-green"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-terminal-text-dim mb-1">Email</label>
          <input
            type="email"
            className="w-full bg-terminal-bg border border-terminal-border rounded px-3 py-2 focus:outline-none focus:border-terminal-green"
            placeholder="Your email"
          />
        </div>

        <div>
          <label className="block text-terminal-text-dim mb-1">Subject</label>
          <input
            type="text"
            className="w-full bg-terminal-bg border border-terminal-border rounded px-3 py-2 focus:outline-none focus:border-terminal-green"
            placeholder="Subject"
          />
        </div>

        <div>
          <label className="block text-terminal-text-dim mb-1">Message</label>
          <textarea
            className="w-full bg-terminal-bg border border-terminal-border rounded px-3 py-2 focus:outline-none focus:border-terminal-green"
            placeholder="Your message"
            rows={5}
          ></textarea>
        </div>

        <Button className="w-full bg-terminal-green text-black hover:bg-terminal-green/90">Send Message</Button>
      </form>
    </div>
  )
}

