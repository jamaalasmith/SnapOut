import React, { useEffect, useState } from "react";
import { Layout, Typography, Space, Card, Tag } from "antd";
const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

const AppLayout = () => {
  const [status, setStatus] = useState(null);
  const [about, setAbout] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [s, a] = await Promise.all([
          fetch("/api/status").then((r) => r.json()),
          fetch("/api/about").then((r) => r.json()),
        ]);
        setStatus(s);
        
        setAbout(a);
      } catch (e) {
        console.error("Failed to load app data", e);
      }
    };
    load();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh", background: "#0b1220" }}>
      <Header style={{ background: "#0b1220", padding: "24px" }}>
        <Title level={2} style={{ color: "#ffffff", margin: 0 }}>
          SnapOut
        </Title>
        <Text style={{ color: "#8ea6ff" }}>
          Break the work‑consume‑repeat cycle
        </Text>
      </Header>
      <Content style={{ maxWidth: 960, margin: "24px auto", padding: "0 16px" }}>
        <Space direction="vertical" size={24} style={{ width: "100%" }}>
          <Card>
            <Title level={3}>Mission</Title>
            <Paragraph>
              At SnapOut, our mission is to help professionals break free from
              the perpetual cycle of work‑consume‑repeat so they can build
              diversified income, align their careers with passion, and gain the
              time and agency to live life on their own terms.
            </Paragraph>
          </Card>

          <Card>
            <Title level={3}>About</Title>
            <Paragraph>
              SnapOut is an early-stage project designed to help people escape
              the rat race through a combination of mindset, systems, and
              digital tools. Whether you're exploring financial independence,
              launching a side hustle, or just want to regain control of your
              time, SnapOut is here to support that journey.
            </Paragraph>
            <Paragraph type="secondary">
              This is a public repo built by a passionate developer currently
              focused on landing a new software engineering job. But if that
              doesn’t work out, this project may evolve into a full startup.
            </Paragraph>
          </Card>

          <Card>
            <Title level={3}>Status</Title>
            {status ? (
              <Space size="small">
                <Tag color="blue">{status.status}</Tag>
                <Text>{status.message}</Text>
              </Space>
            ) : (
              <Text type="secondary">Loading status…</Text>
            )}
          </Card>

          <Card>
            <Title level={3}>Contact</Title>
            <Paragraph>
              Created by Jamaal – Software Developer & Freedom Seeker.
            </Paragraph>
            <Paragraph>
              If you'd like to collaborate or support the mission, feel free to
              reach out.
            </Paragraph>
          </Card>
        </Space>
      </Content>
      <Footer style={{ textAlign: "center", background: "#0b1220", color: "#8ea6ff" }}>
        © {new Date().getFullYear()} SnapOut
      </Footer>
    </Layout>
  );
};

export default AppLayout;
