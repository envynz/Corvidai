import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Linkedin, FileText } from "lucide-react";

const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: (data: typeof formData) => apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(formData);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      subtitle: "hello@corvidai.io",
      action: "Send Message",
      link: "mailto:hello@corvidai.io"
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      subtitle: "Professional Network",
      action: "Connect",
      link: "https://www.linkedin.com/in/alialsaffaf/"
    },
    {
      icon: FacebookIcon,
      title: "Facebook",
      subtitle: "Corvid AI",
      action: "Follow Us",
      link: "https://www.facebook.com/CorvidAI"
    },
    {
      icon: FileText,
      title: "Substack",
      subtitle: "Intelligence Insights",
      action: "Subscribe",
      link: import.meta.env.VITE_SUBSTACK_URL || "https://alitheaiguy.substack.com"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-[hsl(222,84%,15%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold gradient-text mb-4">Let's Connect</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Ready to explore intelligent solutions together? Reach out through any of these channels.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-16 max-w-5xl mx-auto">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            const gradients = [
              "from-[hsl(197,87%,43%)] to-[hsl(217,91%,60%)]",
              "from-[hsl(217,91%,60%)] to-[hsl(327,73%,56%)]",
              "from-[hsl(327,73%,56%)] to-[hsl(43,96%,49%)]",
              "from-[hsl(43,96%,49%)] to-[hsl(197,87%,43%)]"
            ];

            return (
              <Card key={index} className="glass-effect border-none hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 bg-gradient-to-br ${gradients[index]} rounded-lg mx-auto mb-4 flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-[hsl(197,87%,43%)] mb-2">{method.title}</h3>
                  <p className="text-slate-300 text-sm mb-4">{method.subtitle}</p>
                  <a
                    href={method.link}
                    target={method.link.startsWith('http') ? '_blank' : undefined}
                    rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-[hsl(197,87%,43%)] hover:text-[hsl(217,91%,60%)] transition-colors text-sm font-medium"
                  >
                    {method.action}
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Contact Form */}
        <div className="mt-16">
          <Card className="glass-effect border-none max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-[hsl(197,87%,43%)] mb-4 text-center">Start a Conversation</h3>
              <p className="text-slate-300 leading-relaxed mb-6 text-center">
                Whether you're looking for strategic consulting, technology solutions, or just want to discuss innovative ideas, I'm always open to meaningful conversations about intelligent problem-solving.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-[hsl(222,84%,15%)] border-[hsl(197,87%,43%)]/20 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="bg-[hsl(222,84%,15%)] border-[hsl(197,87%,43%)]/20 text-white placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="bg-[hsl(222,84%,15%)] border-[hsl(197,87%,43%)]/20 text-white placeholder:text-slate-400"
                  />
                </div>

                <div className="flex justify-center">
                  <div className="gradient-border">
                    <Button
                      type="submit"
                      disabled={contactMutation.isPending}
                      className="bg-[hsl(222,84%,15%)] text-white px-8 py-3 rounded-xl hover:bg-[hsl(215,25%,27%)] transition-all duration-300 font-medium"
                    >
                      {contactMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}