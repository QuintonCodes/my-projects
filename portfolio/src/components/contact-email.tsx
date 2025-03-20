import { ContactFormData } from "@/lib/types";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export default function ContactEmail(data: ContactFormData) {
  return (
    <Html>
      <Head />
      <Preview>New message from {data.firstname}</Preview>
      <Body style={main}>
        <Container style={box}>
          <Section style={header}>
            <Heading style={heading}>Contact Form Submission</Heading>
          </Section>

          {/* Message Content */}
          <Section style={{ padding: "24px" }}>
            <Text style={emailHeader}>Hello, you have a new message!</Text>

            <Text>
              <strong>First Name:</strong> {data.firstname}
            </Text>
            <Text>
              <strong>Last Name:</strong> {data.lastname}
            </Text>
            <Text>
              <strong>Email:</strong> {data.email}
            </Text>
            <Text>
              <strong>Phone Number:</strong> {data.phone}
            </Text>
            <Text>
              <strong>Service:</strong> {data.service}
            </Text>

            <Text style={{ marginTop: "16px", fontWeight: "500" }}>
              <strong>Message:</strong>
            </Text>
            <Text style={message}>{data.message}</Text>

            {/* Call to Action */}
            <Section style={{ marginTop: "12px", textAlign: "center" }}>
              <Button href={`mailto:${data.email}`} style={buttonStyle}>
                Reply to {data.firstname}
              </Button>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text>Thank you for reaching out to Quinton</Text>
            <Text>
              <Link
                href="https://quinton-portfolio.vercel.app"
                style={{ color: "#2B7FFF", textDecoration: "underline" }}
              >
                Visit my portfolio
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  color: "#ececec",
  fontFamily: "Trebuchet MS, Tahoma, sans-serif",
};

const box = {
  maxWidth: "672px",
  padding: "24px",
  marginInline: "auto",
  backgroundColor: "#1c1c22",
  border: "1px solid #00ff99",
  borderRadius: "4px",
  boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
};

const header = {
  paddingBlock: "8px",
  borderRadius: "4px",
  textAlign: "center" as const,
  backgroundColor: "#00e187",
};

const heading = {
  fontSize: "30px",
  lineHeight: "calc(2.25 / 1.875)",
  fontWeight: "700",
  color: "#ececec",
};

const emailHeader = {
  fontSize: "18px",
  lineHeight: "calc(1.75 / 1.125)",
  fontWeight: "600",
};

const message = {
  backgroundColor: "#d1d5dc",
  padding: "16px",
  border: "1px solid #00ff99",
  borderRadius: "4px",
};

const buttonStyle = {
  display: "inline-block",
  padding: "14px 32px",
  fontSize: "16px",
  textAlign: "center" as const,
  fontWeight: "600",
  color: "#000",
  textDecoration: "none",
  borderRadius: "4px",
  backgroundColor: "#00ff99",
  border: "none",
  cursor: "pointer",
};

const footer = {
  marginTop: "24px",
  fontSize: "14px",
  lineHeight: "calc(1.25 / 0.875)",
  textAlign: "center" as const,
  color: "#ececec",
};
