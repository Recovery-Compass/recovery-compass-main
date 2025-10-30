import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Sparkles, Target } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F1F0FB] to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
            About Recovery Compass
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Empowering survivors and underserved communities through innovative technology and trauma-informed advocacy.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="max-w-4xl mx-auto mb-16 border-2 border-[#9b87f5]">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-4 text-[#7E69AB]">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Recovery Compass empowers domestic violence survivors and underserved communities through innovative technology solutions, trauma-informed advocacy frameworks, and AI-powered legal intelligence systems. We provide strategic coordination, documentation protocols, and workforce development pathways that transform crisis into sustainable recovery—ensuring access to justice, safety, and economic opportunity for vulnerable populations nationwide.
            </p>
          </CardContent>
        </Card>

        {/* 501(c)(3) Nonprofit Info */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <Card className="inline-block">
            <CardContent className="p-6">
              <Shield className="w-12 h-12 mx-auto mb-4 text-[#9b87f5]" />
              <p className="text-gray-700 font-semibold mb-2">Registered 501(c)(3) Nonprofit Organization</p>
              <p className="text-sm text-gray-600">EIN: 33-3213246</p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values Grid */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#7E69AB]">Our Approach</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Target className="w-12 h-12 mb-4 text-[#9b87f5]" />
                <h3 className="text-xl font-bold mb-3">Strategic Coordination</h3>
                <p className="text-gray-700">
                  We provide AI-powered legal intelligence systems and documentation protocols that enable effective crisis response and long-term planning.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Users className="w-12 h-12 mb-4 text-[#9b87f5]" />
                <h3 className="text-xl font-bold mb-3">Trauma-Informed Advocacy</h3>
                <p className="text-gray-700">
                  Our frameworks preserve client agency while providing comprehensive support through proven boundary scripts and ethical protocols.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Sparkles className="w-12 h-12 mb-4 text-[#9b87f5]" />
                <h3 className="text-xl font-bold mb-3">Workforce Development</h3>
                <p className="text-gray-700">
                  We create pathways from crisis to career through environmental response programs and sustainable employment opportunities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Programs Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#7E69AB]">Our Programs</h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-[#9b87f5]">Legal Intelligence Systems</h3>
                <p className="text-gray-700">
                  AI-powered case documentation, evidence timeline automation, real-time threat detection, and strategic coordination dashboards for domestic violence survivors and their advocates.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-[#9b87f5]">Environmental Response Design (ERD Method)</h3>
                <p className="text-gray-700">
                  Sustainable workforce pathways connecting environmental restoration with community healing, creating dignified employment opportunities for underserved populations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-[#9b87f5]">Advocacy Training & Certification</h3>
                <p className="text-gray-700">
                  Professional development programs teaching force multiplication thinking, trauma-informed protocols, and strategic mission command advocacy to service providers nationwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Impact Section */}
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] text-white">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Creating Systemic Change</h2>
            <p className="text-lg leading-relaxed text-center">
              Recovery Compass doesn't just respond to individual crises—we build replicable systems that transform how communities support survivors. Through technology, training, and trauma-informed frameworks, we're creating a future where access to justice, safety, and opportunity are guaranteed for all.
            </p>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4 text-[#7E69AB]">Join Our Mission</h2>
          <p className="text-gray-700 mb-6">
            Whether you're a survivor seeking support, an organization seeking partnership, or a funder seeking impact—we're here to collaborate.
          </p>
          <a 
            href="mailto:eric@recovery-compass.org" 
            className="inline-block bg-[#9b87f5] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#7E69AB] transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
