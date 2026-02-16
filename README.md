# Fitcoach_ai_logic
Fitcoach.AI is an automated "Coaching Sidekick" designed to scale the expertise of professional fitness coaches. It bridges the gap between raw tracking data and high-impact interventions by utilizing a Multi-Agent Orchestration system

Fitcoach.AI: Multi-Agent Coaching Intelligence Layer
🎯 Project Overview
Fitcoach.AI is an AI-powered automation ecosystem built to solve the "scaling bottleneck" for professional fitness coaches. In traditional online coaching, as a client roster grows, the coach’s ability to perform deep-dive data analysis on every workout and nutrition log diminishes. This project introduces a Multi-Agent Orchestration layer that ingests multi-stream client data, identifies physiological plateaus, and provides coaches with an "Expert-Verified" 30-second brief for every client.

🛠️ The Tech Stack
Workflow Orchestration: n8n
Front-end Dashboard: Lovable
LLM "Brains": OpenAI GPT 5.2
Data Ingestion: Google Sheets & JavaScript (Node.js)
Backend/Database: Supabase (Edge Functions)

🧠 System Architecture & Logic
1. Data Triangulation (The Ingestion Stage)
Using custom JavaScript nodes in n8n, the system merges three disparate data streams—Client Profiles, Workout Stats, and Nutrition/Movement Logs—into a unified JSON object. This allows the AI to perform "cross-metric analysis" (e.g., correlating a 15% drop in squat strength with a 48-hour sleep deficit).

2. Master-Sub Agent Reasoning Chain
The system employs a Supervisor/Worker pattern:
Master Agent: Acts as the "Logic Gatekeeper." It evaluates incoming data against a 10% variance threshold.
Sub-Agents (Tools): Specialized LLM agents triggered only when specific deviations are met.
Workout Specialist: Diagnoses kinesiological plateaus.
Nutrition Specialist: Identifies recovery debt and caloric adherence issues.

3. Human-in-the-Loop (HITL) Guardrails
To ensure safety and maintain the coach’s proprietary "voice," the system includes a mandatory approval step. Before a client receives an intervention, the coach receives an automated brief with Approve/Edit/Decline options.

📈 Product Impact (The PM Lens)
Scalability: Increases coach capacity by an estimated 60% by automating the manual data-crunching phase.
Data Moat: Every "Expert-Approved" intervention is logged back into the system, creating a proprietary dataset for future fine-tuning.
Safety: Built-in Medical Flag detection triggers manual coach alerts if the AI detects keywords related to injury or extreme physiological outliers.

How to Explore This Repo
/workflows: Contains the .json exports of the n8n logic.
/scripts: Includes the JavaScript snippets used for data mapping and stringification.
/Frontend_UI: Source code for the Lovable-powered coach dashboard.
