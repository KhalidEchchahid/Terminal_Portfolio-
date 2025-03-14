import Link from "./link"

export default function SocialLinks() {
  return (
    <div className="bg-terminal-header p-4 rounded-lg">
      <h3 className="text-lg font-bold text-terminal-yellow mb-4">Social Links</h3>

      <div className="space-y-4">
        <div>
          <p className="font-medium text-terminal-purple">GitHub</p>
          <Link
            href="https://github.com/khalid-echchahid"
            className="text-terminal-text-dim hover:text-terminal-text transition-colors"
          >
            github.com/khalid-echchahid
          </Link>
        </div>

        <div>
          <p className="font-medium text-terminal-blue">LinkedIn</p>
          <Link
            href="https://linkedin.com/in/khalid-echchahid"
            className="text-terminal-text-dim hover:text-terminal-text transition-colors"
          >
            linkedin.com/in/khalid-echchahid
          </Link>
        </div>
      </div>
    </div>
  )
}

