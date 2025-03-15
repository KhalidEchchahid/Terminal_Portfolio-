"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CodeBlock } from "../syntax-highlight"
import { Github } from "lucide-react"

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(0)

  const projects = [
    {
      id: "university-platform",
      name: "University Collaboration Platform",
      description:
        "A comprehensive platform that facilitates collaboration between students and professors, featuring file sharing, recommendation letter requests, announcements, and blogs.",
      technologies: [
        "React",
        "Spring Boot",
        "Spring Security",
        "Spring Cloud",
        "Microservices",
        "PostgreSQL",
        "RabbitMQ",
      ],
      github: "https://github.com/KhalidEchchahid/full-project",
      codeSnippet: `
// Project architecture - Microservices implementation
@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    @Autowired
    private RouteValidator validator;

    //    @Autowired
//    private RestTemplate template;
    @Autowired
    private JwtUtil jwtUtil;

    public AuthenticationFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            if (validator.isSecured.test(exchange.getRequest())) {
                //header contains token or not
                if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                    throw new RuntimeException("missing authorization header");
                }

                String authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
                if (authHeader != null && authHeader.startsWith("Bearer ")) {
                    authHeader = authHeader.substring(7);
                }
                try {
//                    //REST call to AUTH service
//                    template.getForObject("http://IDENTITY-SERVICE/validate?token" + authHeader, String.class);
                    jwtUtil.validateToken(authHeader);

                } catch (Exception e) {
                    System.out.println("invalid access...!");
                    throw new RuntimeException("un authorized access to application");
                }
            }
            return chain.filter(exchange);
        });
    }

    public static class Config {

    }
}`,
      language: "java",
    },
    {
      id: "intra-enterprise",
      name: "Intra-Enterprise Collaboration System",
      description:
        "A web application for collaboration within companies, similar to Stack Overflow, featuring an announcement system, event organization, and blogs for internal communication.",
      technologies: ["Next.js 14", "NextAuth", "MongoDB"],
      github: "https://github.com/KhalidEchchahid/Intra-entreprise_nextjs14/tree/main",
      codeSnippet: `
// Authentication implementation with NextAuth
export { default } from "next-auth/middleware";

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request : any) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  
  if (!token) return NextResponse.redirect(new URL("/login", request.url));

  // Check the role and redirect based on the role
  switch (token.role) {
    case "CLIENT":
      if (
        !request.nextUrl.pathname.startsWith("/") &&
        !request.nextUrl.pathname.startsWith("/question") &&
        !request.nextUrl.pathname.startsWith("/profile") &&
        !request.nextUrl.pathname.startsWith("/ask-question") &&
        !request.nextUrl.pathname.startsWith("/community") &&
        !request.nextUrl.pathname.startsWith("/tags") &&
        !request.nextUrl.pathname.startsWith("/community") 
      ) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      break;
    case "ADMIN":
      // Add the paths that the ADMIN can access here
      if (!request.nextUrl.pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      break;
    default:
      return NextResponse.redirect(new URL("/login", request.url));
  }
}



export const config = {
  matcher: [
    // Match all routes except the ones that start with /login and api and the static folder
    "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
  ],
};`,
      language: "javascript",
    },
    {
      id: "gladiator-game",
      name: "Gladiator: 2D Fighting Game",
      description:
        "A 2D fighting game developed from scratch using the C programming language and GTK for the graphical user interface. The game includes various mechanics, characters, and visual effects.",
      technologies: ["C", "GTK Library"],
      github: "https://github.com/KhalidEchchahid/gladiator-game",
      codeSnippet: `
// Game loop , collision detection and animation update
gboolean update_animation(gpointer data) {
    if (is_paused || is_game_over) {
        return TRUE;
    }

    // Ensure the gladiator stops all actions if dead
    if (gladiator.health <= 0) {
        gladiator.current_action = 9; // Dying action
        if (gladiator.current_frame < gladiator.action_frames.dying - 1) {
            gladiator.current_frame++;
        }
        // Stay on the last frame of the dying animation
        if (gladiator.current_frame >= gladiator.action_frames.dying - 1) {
            gladiator.current_frame = gladiator.action_frames.dying - 1;
        }
        // Update the action of the machine to standing when gladiator dies
        machine.current_action = 0; // Standing action
    } else {
        update_health_label(gladiator.health, gladiator_health_label);

        int frame_count = 0;
        switch (gladiator.current_action) {
            case 0: frame_count = gladiator.action_frames.standing; break;
            case 1: frame_count = gladiator.action_frames.walking; break;
            case 2: frame_count = gladiator.action_frames.running; break;
            case 3: frame_count = gladiator.action_frames.attacking1; break;
            case 4: frame_count = gladiator.action_frames.attacking2; break;
            case 5: frame_count = gladiator.action_frames.attacking3; break;
            case 6: frame_count = gladiator.action_frames.defending; break;
            case 7: frame_count = gladiator.action_frames.jumping; break;
            case 8: frame_count = gladiator.action_frames.hurting; break;
            case 9: frame_count = gladiator.action_frames.dying; break;
        }

        int x = (gladiator.current_frame % frame_count) * gladiator.sprite_width;
        int y = gladiator.current_action * gladiator.sprite_height;
        GdkPixbuf *frame = gdk_pixbuf_new_subpixbuf(gladiator.sprite_sheet, x, y, gladiator.sprite_width, gladiator.sprite_height);
        gtk_image_set_from_pixbuf(gladiator.image, frame);
        gtk_fixed_move(GTK_FIXED(data), GTK_WIDGET(gladiator.image), gladiator.x_position, gladiator.y_position);

        // Check if gladiator is dying
        if (gladiator.current_action == 9 && gladiator.current_frame == gladiator.action_frames.dying - 1) {
            is_game_over = TRUE; // Set game over state
        }
        gladiator.current_frame++;

        if (gladiator.current_frame >= frame_count) {
            gladiator.current_frame = 0;
        }

        // Handle gladiator movement
        if (!(gladiator.x_position >= 1900 - gladiator.sprite_width)) {
            if (gladiator.current_action == 1) {
                gladiator.x_position += gladiator.speed / 2;
            } else if (gladiator.current_action == 2) {
                gladiator.x_position += gladiator.speed;
            } else if (gladiator.current_action == 7) {
                if (is_backward && gladiator.x_position >= 17) {
                    gladiator.x_position -= gladiator.speed;
                } else {
                    gladiator.x_position += gladiator.speed - 2;
                }
            }
        }
    }

    return TRUE;
}
`,
      language: "c",
    },
    {
      id: "maze-pathfinder",
      name: "Maze Pathfinder",
      description:
        "A Next.js web application that visualizes Dijkstra's Algorithm and Breadth-First Search (BFS) for maze pathfinding, with backend processing handled by a C++ web server.",
      technologies: ["C++", "Next.js 15", "Tailwind CSS"],
      github: "https://github.com/KhalidEchchahid/Muze-Dijkstra-BFS-nextjs-c-",
      backendGithub: "https://github.com/KhalidEchchahid/Muze-backend/blob/main",
      codeSnippet: `
// C++ Implementation of Dijkstra's Algorithm for maze pathfinding
json dijkstra() {
        std::priority_queue<std::pair<int, Cell*>, std::vector<std::pair<int, Cell*>>, std::greater<>> pq;
        startCell->distance = 0;
        pq.push({ 0, startCell });

        std::vector<std::vector<int>> visited;
        std::vector<std::vector<int>> path;

        while (!pq.empty()) {
            Cell* current = pq.top().second;
            pq.pop();

            if (current == endCell) {
                while (current != startCell) {
                    path.push_back({ current->row, current->col });
                    current = current->previous;
                }
                std::reverse(path.begin(), path.end());
                return { {"visited", visited}, {"path", path} };
            }

            if (current->state == VISITED) continue;
            current->state = VISITED;
            visited.push_back({ current->row, current->col });

            for (Cell* neighbor : getNeighbors(current)) {
                int newDist = current->distance + 1;
                if (newDist < neighbor->distance) {
                    neighbor->distance = newDist;
                    neighbor->previous = current;
                    pq.push({ newDist, neighbor });
                }
            }
        }

        return { {"visited", visited}, {"path", path} };
    }`,
      language: "cpp",
    },
  ]

  const handleNext = () => {
    setActiveProject((prev) => (prev + 1) % projects.length)
  }

  const handlePrev = () => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const project = projects[activeProject]

  return (
    <div>
      <h2 className="text-lg font-bold mb-4 text-terminal-purple">Projects</h2>

      <div className="flex overflow-x-auto mb-4 pb-2 space-x-2 scrollbar-hide">
        {projects.map((p, index) => (
          <button
            key={p.id}
            className={`px-3 py-1 whitespace-nowrap rounded text-sm ${
              index === activeProject
                ? "bg-terminal-header-light text-terminal-yellow"
                : "text-terminal-text-dim hover:text-terminal-text"
            }`}
            onClick={() => setActiveProject(index)}
          >
            {p.name}
          </button>
        ))}
      </div>

      <motion.div
        key={project.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="border border-terminal-border rounded-md bg-terminal-code/20 p-4"
      >
        <div className="mb-4">
          <h3 className="text-lg font-bold text-terminal-yellow mb-2">{project.name}</h3>
          <p className="text-terminal-text mb-3">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-2 py-1 text-xs rounded bg-terminal-header-light text-terminal-text-bright">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex space-x-3 mb-6">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-terminal-green hover:underline"
            >
              <Github className="w-4 h-4 mr-1" /> GitHub
            </a>

            {project.backendGithub && (
              <a
                href={project.backendGithub}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-terminal-blue hover:underline"
              >
                <Github className="w-4 h-4 mr-1" /> Backend Repo
              </a>
            )}
          </div>
        </div>

        <div className="bg-terminal-code rounded mb-3">
          <div className="px-3 py-1 bg-terminal-header-dark text-terminal-text-dim text-sm">
            {project.id}.{project.language}
          </div>
          <CodeBlock language={project.language} showLineNumbers={true}>
            {project.codeSnippet}
          </CodeBlock>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrev}
            className="px-3 py-1 rounded text-sm text-terminal-text-dim hover:text-terminal-text hover:bg-terminal-header-light"
          >
            ← Previous
          </button>
          <button
            onClick={handleNext}
            className="px-3 py-1 rounded text-sm text-terminal-text-dim hover:text-terminal-text hover:bg-terminal-header-light"
          >
            Next →
          </button>
        </div>
      </motion.div>

      <div className="mt-6 border-t border-terminal-border pt-4 text-terminal-text-dim">
        <p>
          Type <span className="text-terminal-yellow">contact</span> to get in touch.
        </p>
      </div>
    </div>
  )
}

