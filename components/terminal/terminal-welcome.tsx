"use client"

import { useContext } from "react"
import { TerminalContext } from "@/contexts/terminal-context"

export default function TerminalWelcome() {
  const { theme } = useContext(TerminalContext)

  return (
    <div className="mb-4 text-terminal-text-dim">
      <pre className={theme.textGreenClass}>
        {`
_  __  _           _  _      _      ______          _         _           _     _      _ 
| |/ / | |         | |(_)    | |    |  ____|        | |       | |         | |   (_)    | |
| ' /  | |__   __ _| | _   __| |    | |__    ___ ___| |__   ___| |__   __ _| |__  _  __| |
|  <   | '_ \\ / _\` | || | / _\` |    |  __|  / __/ __| '_ \\ / __| '_ \\ / _\` | '_ \\| |/ _\` |
| . \\  | | | | (_| | || || (_| |    | |____| (_| (__| | | | (__| | | | (_| | | | | | (_| |
|_|\\_\\ |_| |_|\\__,_|_||_| \\__,_|    |______|\\___|___|_| |_|\\___|_| |_|\\__,_|_| |_|_|\\__,_|
                                                                                          
`}
      </pre>
      <p className="mb-2">Welcome to my interactive developer portfolio terminal.</p>
      <p>
        Type <span className={theme.textYellowClass}>help</span> to see available commands or navigate using the tabs
        above. Try <span className={theme.textGreenClass}>launch_portfolio</span> for a special experience!
      </p>
    </div>
  )
}

