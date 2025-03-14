import type { JSX } from "react"

export default function ContactInfo(): JSX.Element {
  return (
    <div className="bg-terminal-header p-4 rounded-lg">
      <h3 className="text-lg font-bold text-terminal-yellow mb-4">Contact Information</h3>

      <div className="space-y-4">
        <div>
          <p className="font-medium text-terminal-blue">Email</p>
          <p>echchahidkhalid7@gmail.com</p>
          <p>khalid.echchahid@usmba.ac.ma</p>
        </div>

        <div>
          <p className="font-medium text-terminal-green">Phone</p>
          <p>+212-645557609</p>
        </div>

        <div>
          <p className="font-medium text-terminal-red">Location</p>
          <p>Fez, Morocco</p>
        </div>
      </div>
    </div>
  )
}

