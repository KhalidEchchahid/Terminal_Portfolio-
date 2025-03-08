"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Flag } from "lucide-react";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  date: string;
  likes: number;
  replies?: Comment[];
}

interface CommentsProps {
  postSlug: string;
}

export default function Comments({ postSlug }: CommentsProps) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content:
        "Great article! I especially liked the part about terminal customization.",
      date: "2024-03-08T12:00:00Z",
      likes: 5,
      replies: [
        {
          id: "2",
          author: {
            name: "Jane Smith",
          },
          content: "Agreed! The keyboard shortcuts section was very helpful.",
          date: "2024-03-08T13:00:00Z",
          likes: 2,
        },
      ],
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: {
        name: "You",
        avatar: "/your-avatar.jpg",
      },
      content: comment,
      date: new Date().toISOString(),
      likes: 0,
    };

    setComments([newComment, ...comments]);
    setComment("");
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="border border-terminal-border rounded-lg p-6 bg-terminal-header-dark">
      <h3 className="text-xl font-bold text-terminal-green mb-6 flex items-center gap-2">
        <MessageSquare className="h-5 w-5" />
        Comments ({comments.length})
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <Textarea
          placeholder="Leave a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mb-4 bg-terminal-header border-terminal-border focus:border-terminal-green"
          rows={4}
        />
        <Button
          type="submit"
          className="bg-terminal-green text-black hover:bg-terminal-green/90"
          disabled={!comment.trim()}
        >
          Post Comment
        </Button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-4">
            {/* Main Comment */}
            <div className="border border-terminal-border rounded-lg p-4 bg-terminal-header">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage
                    src={comment.author.avatar}
                    alt={comment.author.name}
                  />
                  <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-medium text-terminal-text">
                        {comment.author.name}
                      </span>
                      <span className="text-sm text-terminal-text-dim ml-2">
                        {formatDate(comment.date)}
                      </span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Flag className="h-4 w-4" />
                      <span className="sr-only">Report</span>
                    </Button>
                  </div>
                  <p className="text-terminal-text mb-3">{comment.content}</p>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-terminal-text-dim hover:text-terminal-green"
                    >
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      {comment.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-terminal-text-dim hover:text-terminal-green"
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Replies */}
            {comment.replies?.map((reply) => (
              <div
                key={reply.id}
                className="ml-12 border border-terminal-border rounded-lg p-4 bg-terminal-header"
              >
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage
                      src={reply.author.avatar}
                      alt={reply.author.name}
                    />
                    <AvatarFallback>{reply.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-medium text-terminal-text">
                          {reply.author.name}
                        </span>
                        <span className="text-sm text-terminal-text-dim ml-2">
                          {formatDate(reply.date)}
                        </span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Flag className="h-4 w-4" />
                        <span className="sr-only">Report</span>
                      </Button>
                    </div>
                    <p className="text-terminal-text mb-3">{reply.content}</p>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-terminal-text-dim hover:text-terminal-green"
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        {reply.likes}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
