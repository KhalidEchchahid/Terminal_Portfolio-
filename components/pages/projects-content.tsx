"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import PageLayout from "./page-layout"
import { CodeBlock } from "../syntax-highlight"
import { Github } from "lucide-react"

export default function ProjectsContent() {
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
      github: "https://github.com/username/university-collaboration-platform",
      codeSnippet: `
// Project architecture - Microservices implementation
@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients
public class CollaborationServiceApplication {
  public static void main(String[] args) {
    SpringApplication.run(CollaborationServiceApplication.class, args);
  }
  
  @Bean
  @LoadBalanced
  public RestTemplate restTemplate() {
    return new RestTemplate();
  }
}

@RestController
@RequestMapping("/api/collaboration")
public class CollaborationController {
  @Autowired
  private CollaborationService service;
  
  @PostMapping("/request")
  public ResponseEntity<CollaborationRequest> createRequest(
      @RequestBody CollaborationRequest request) {
    return ResponseEntity.ok(service.createRequest(request));
  }
  
  @GetMapping("/requests/{studentId}")
  public ResponseEntity<List<CollaborationRequest>> getStudentRequests(
      @PathVariable Long studentId) {
    return ResponseEntity.ok(service.getStudentRequests(studentId));
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
      github: "https://github.com/username/intra-enterprise-collaboration",
      codeSnippet: `
// Authentication implementation with NextAuth
import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await db.user.findUnique({
          where: { email: credentials.email }
        });
        
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return { id: user.id, name: user.name, email: user.email, role: user.role };
        }
        return null;
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    }
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  }
});`,
      language: "javascript",
    },
    {
      id: "gladiator-game",
      name: "Gladiator: 2D Fighting Game",
      description:
        "A 2D fighting game developed from scratch using the C programming language and GTK for the graphical user interface. The game includes various mechanics, characters, and visual effects.",
      technologies: ["C", "GTK Library"],
      github: "https://github.com/username/gladiator-game",
      codeSnippet: `
// Game loop and collision detection
void game_update(GameState *state) {
    // Update player positions based on input
    if (state->player1.isMovingRight && !state->player1.isAttacking) {
        state->player1.x += PLAYER_SPEED;
        state->player1.currentSprite = SPRITE_WALK;
        state->player1.facingRight = TRUE;
    } 
    // ... more movement code ...
    
    // Check for collisions between players
    if (check_collision(&state->player1, &state->player2)) {
        // Handle collision (push back, etc.)
        if (state->player1.isAttacking && !state->player2.isBlocking) {
            apply_damage(&state->player2, state->player1.attackPower);
            create_hit_effect(state, state->player2.x, state->player2.y);
            play_sound(SOUND_HIT);
        } else if (state->player2.isBlocking) {
            play_sound(SOUND_BLOCK);
        }
    }
    
    // Update animations and effects
    update_animations(state);
    update_effects(state);
    
    // Check win conditions
    if (state->player1.health <= 0 || state->player2.health <= 0) {
        state->gameOver = TRUE;
    }
}

gboolean on_draw(GtkWidget *widget, cairo_t *cr, GameState *state) {
    // Clear the surface
    cairo_set_source_rgb(cr, 0.1, 0.1, 0.1);
    cairo_paint(cr);
    
    // Draw the background
    draw_background(cr, state);
    
    // Draw players
    draw_player(cr, &state->player1);
    draw_player(cr, &state->player2);
    
    // Draw UI elements
    draw_health_bars(cr, state);
    draw_effects(cr, state);
    
    if (state->gameOver) {
        draw_game_over(cr, state);
    }
    
    return FALSE;
}`,
      language: "c",
    },
    {
      id: "maze-pathfinder",
      name: "Maze Pathfinder",
      description:
        "A Next.js web application that visualizes Dijkstra's Algorithm and Breadth-First Search (BFS) for maze pathfinding, with backend processing handled by a C++ web server.",
      technologies: ["C++", "Next.js 15", "Tailwind CSS"],
      github: "https://github.com/username/maze-pathfinder-frontend",
      backendGithub: "https://github.com/username/maze-pathfinder-backend",
      codeSnippet: `
// C++ Implementation of Dijkstra's Algorithm for maze pathfinding
std::vector<Point> dijkstra(const Maze& maze, Point start, Point end) {
    const int rows = maze.getRows();
    const int cols = maze.getCols();
    
    // Priority queue for Dijkstra's algorithm
    std::priority_queue<Node, std::vector<Node>, std::greater<Node>> pq;
    
    // Distance matrix
    std::vector<std::vector<int>> dist(rows, std::vector<int>(cols, INT_MAX));
    
    // Parent matrix to reconstruct path
    std::vector<std::vector<Point>> parent(rows, std::vector<Point>(cols, {-1, -1}));
    
    // Initialize start node
    dist[start.x][start.y] = 0;
    pq.push({start, 0});
    
    // Directions: up, right, down, left
    const int dx[] = {-1, 0, 1, 0};
    const int dy[] = {0, 1, 0, -1};
    
    while (!pq.empty()) {
        Node current = pq.top();
        pq.pop();
        
        Point pos = current.pos;
        
        // If we reached the end point
        if (pos.x == end.x && pos.y == end.y) {
            break;
        }
        
        // Skip if we've found a better path already
        if (current.dist > dist[pos.x][pos.y]) {
            continue;
        }
        
        // Explore all four directions
        for (int i = 0; i < 4; i++) {
            int nx = pos.x + dx[i];
            int ny = pos.y + dy[i];
            
            // Check if valid and not a wall
            if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && 
                !maze.isWall(nx, ny)) {
                
                int newDist = dist[pos.x][pos.y] + 1;
                
                // If we found a better path
                if (newDist < dist[nx][]) {
                    dist[nx][ny] = newDist;
                    parent[nx][ny] = pos;
                    pq.push({{nx, ny}, newDist});
                }
            }
        }
    }
    
    // Reconstruct the path
    std::vector<Point> path;
    Point current = end;
    
    while (!(current.x == start.x && current.y == start.y)) {
        path.push_back(current);
        current = parent[current.x][current.y];
        
        // No path found
        if (current.x == -1) {
            return {};
        }
    }
    
    path.push_back(start);
    std::reverse(path.begin(), path.end());
    
    return path;
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
    <PageLayout title="Projects">
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
    </PageLayout>
  )
}

