import { GoogleGenerativeAI } from "@google/generative-ai";

const businessInfo = `
Dog Training:
Basic Obedience:
- Teach commands like "sit", "stay", "come", and "leave it".
- Use treats, praise, and toys as positive reinforcement.
- Keep training sessions short (5-10 minutes) but frequent.

House Training:
- Take your dog outside regularly, especially after meals.
- Reward immediately when they go outside.
- Maintain a consistent feeding and potty schedule.

Leash Training:
- Use a short leash initially and reward calm walking.
- Stop walking if the dog pulls, resume when it relaxes.

Behaviour Correction:
- Never use physical punishment. Redirect bad behaviour calmly.
- Consistency is key. Everyone in the household should follow the same rules.

Cat Training:
Litter Box Training:
- Place the box in a quiet, accessible location.
- Clean it daily. Avoid scented litter if your cat is fussy.
- Reward and praise when they use the box properly.

Scratching Behaviour:
- Provide scratching posts and redirect if they scratch furniture.
- Use catnip or treats to encourage scratching in the right place.

Commands and Enrichment:
- Train with clicker or treats for tricks like "sit" or "high-five".
- Use puzzle feeders and toys to prevent boredom.

General Advice:
- Cats respond better to calm, patient training.
- Avoid punishment. It may stress them and make behaviours worse.

Bird Training (General):
- Birds respond well to consistent routines and gentle tone.
- Teach them to perch on your finger using treats or praise.
- Keep sessions short (5-10 minutes) and daily.

Handling:
- Move slowly. Sudden movements can frighten birds.
- Talk softly and build trust before handling.

Enrichment:
- Rotate toys regularly to prevent boredom.
- Offer foraging opportunities and puzzles.

Reptile Training (General):
- Reptiles aren’t social like mammals, so training focuses on handling and routine.
- Start with hand-feeding to build trust.
- Avoid handling when shedding or stressed.

Handling:
- Support the full body when lifting.
- Be patient — reptiles take longer to acclimate.

Habitat Consistency:
- Maintain consistent lighting, temperature, and feeding times.
- Stress can affect their health, so avoid loud noises or frequent changes.

Hamster Training:
- Begin by letting your hamster get used to your scent.
- Offer treats from your hand, then progress to gentle handling.
- Use tunnels, wheels, and toys to keep them active and happy.

General Training Tips for All Pets:
- Consistency and patience are crucial.
- Avoid shouting or physical punishment — use rewards.
- Respect your pet’s space and mood.



Location:
Address: 123 Pet Lane, Barktown, CA 90210, USA
Phone: +1 800-555-PAWS
Email: info@pettrainingbuddy.com
Opening Hours:
Monday to Friday: 9:00 AM to 6:00 PM
Saturday: 10:00 AM to 4:00 PM
Sunday: Closed

Tone Instructions:
Conciseness: Keep replies under 3 sentences where possible.
Formality: Friendly and professional tone. Avoid harsh words.
Clarity: Use plain English. Break down complex behaviour tips.
Consistency: All replies should be helpful and aligned with positive reinforcement methods.
Example: "Of course! You can begin puppy training at 8 weeks with gentle commands like ‘sit’ and ‘stay.’ Let us know if you'd like a guide!

`;

const API_KEY = "AIzaSyCvBXsrHxkdiPGvsq9FZw9o3YsRspzHWSE";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: businessInfo
});

let messages = {
    history: [],
}

async function sendMessage() {

    console.log(messages);
    const userMessage = document.querySelector(".chat-window input").value;
    
    if (userMessage.length) {

        try {
            document.querySelector(".chat-window input").value = "";
            document.querySelector(".chat-window .chat").insertAdjacentHTML("beforeend",`
                <div class="user">
                    <p>${userMessage}</p>
                </div>
            `);

            document.querySelector(".chat-window .chat").insertAdjacentHTML("beforeend",`
                <div class="loader"></div>
            `);

            const chat = model.startChat(messages);

            let result = await chat.sendMessageStream(userMessage);
            
            document.querySelector(".chat-window .chat").insertAdjacentHTML("beforeend",`
                <div class="model">
                    <p></p>
                </div>
            `);
            
            let modelMessages = '';

            for await (const chunk of result.stream) {
              const chunkText = chunk.text();
              modelMessages = document.querySelectorAll(".chat-window .chat div.model");
              modelMessages[modelMessages.length - 1].querySelector("p").insertAdjacentHTML("beforeend",`
                ${chunkText}
            `);
            }

            messages.history.push({
                role: "user",
                parts: [{ text: userMessage }],
            });

            messages.history.push({
                role: "model",
                parts: [{ text: modelMessages[modelMessages.length - 1].querySelector("p").innerHTML }],
            });

        } catch (error) {
            document.querySelector(".chat-window .chat").insertAdjacentHTML("beforeend",`
                <div class="error">
                    <p>The message could not be sent. Please try again.</p>
                </div>
            `);
        }

        document.querySelector(".chat-window .chat .loader").remove();
        
    }
}

document.querySelector(".chat-window .input-area button")
.addEventListener("click", ()=>sendMessage());

document.querySelector(".chat-button")
.addEventListener("click", ()=>{
    document.querySelector("body").classList.add("chat-open");
});

document.querySelector(".chat-window button.close")
.addEventListener("click", ()=>{
    document.querySelector("body").classList.remove("chat-open");
});

