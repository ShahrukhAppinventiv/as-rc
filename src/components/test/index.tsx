import "../../assets/styles/contactUs.scss";
import ContactPhotoOne from "../../assets/images/contact-danna.png";
import ContactPhotoTwo from "../../assets/images/contact-photo-2.png";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  summary: string[];
  image: string;
  avatarClassName?: string;
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Danna Okuyama",
    role: "Founder",
    summary: [
      "Before starting Urban Sandbox, Danna worked in finance, but becoming a parent shifted everything. Through her own journey raising her son, she saw just how important confidence and self-expression are in shaping a child's well-being-and how difficult it can be for parents to find clear, reliable guidance in a private and comfortable setting. That experience became the foundation for Urban Sandbox. Danna created the platform to encourage children to express themselves, build resilience, and grow into who they are-while also giving parents access to thoughtful resources, expert insight, and on-demand support when they need it most. At its heart, Danna hopes that through Urban Sandbox, no parent feels alone, and every child has the opportunity to thrive.",
      "When she's not building Urban Sandbox, Danna is either cheering on her favorite teams or out playing sports with her son-her favorite teammate and biggest inspiration.",
    ],
    image: ContactPhotoOne,
    avatarClassName: "avatar-first",
  },
  {
    id: 2,
    name: "Bobby Byrom",
    role: "Clinical Director",
    summary: [
      "Dr. Robert Byrom, PhD (Bobby) is a licensed psychologist (CA, CO, TX, WA) who specializes in clinical supervision, providing support for trainees throughout their professional trajectories. His expertise related to applied positive psychology helps clients and supervisees holistically increase their ability to promote growth-oriented change practices in their lives. He aims to empower clients by applying cultural humility to each facet of the therapeutic context, acknowledging and honoring their lived experiences as they seek to make meaningful changes informed by their personal values.",
    ],
    image: ContactPhotoTwo,
  },
];

const ContactUs = () => {
  return (
    <div className="pageBody contact-us-page">
      <div className="contact-us-wrapper">
        <section className="contact-us-content">
          <h2>Our Team</h2>

          <div className="team-grid">
            {teamMembers.map((member) => (
              <article key={member.id} className="team-card">
                <img
                  className={`avatar ${member.avatarClassName || ""}`.trim()}
                  src={member.image}
                  alt={member.name}
                />
                <div className="team-content">
                  <h4>{member.name}</h4>
                  <p className="role">{member.role}</p>
                  <div className="summary">
                    {member.summary.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;
