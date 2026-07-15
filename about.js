document.addEventListener('DOMContentLoaded', () => {
    
    // Bio database
    const bios = {
        bhagya: {
            name: "Bhagya Rangachar",
            role: "Founder & Managing Trustee",
            text: `<p>Ms. Bhagya Rangachar is the Founder of CLT India and President of the CLT International Foundation Inc., U.S.A. She served as CEO from 1997-2021 August. Bhagya lived in the U.S. and worked as a Software Professional for more than 15 years. Her academic and professional background has been in Science, Mathematics and Technology. She has completed Social Impact Leadership Program – a Dasra and Harvard Cohort. She has also been part of many technology and leadership cohorts in Boston at the Computer Clubhouse Network.</p>
                   <p>She has overseen the development of CLT for over 20 years, from being a Trust that was first to implement mid-day meals in government schools in Karnataka State to an organization that has developed large repository of NCERT-based digital STEM content in regional languages with low-cost technology delivery models and data analytics. Her body of work has been to bridge the gap of missed learning opportunities in STEM in rural schools due to teacher shortage and lack of learning resources in regional languages; and leveraging technology for distribution and scale. The recent launch of 2 mobile APPs in Google Play Store, Jigi and Jigi Jigi is to further amplify the efforts to give access to quality education in under-served communities. Bhagya was listed as one of 100 women in the Coffee Table Book, ‘Phenomenal She’ by Indian National Bar Association and has been recognized as one of the 50 Globally Listed Social Innovators on World CSR Day 2017.</p>
                   <p>Under her leadership, CLT has won many awards, including – 2 Millennium Alliance Awards by FICCI and USAID for low-cost innovation in e-learning, Digital India award by the Times Group. CNBC 18 recently showcased CLT as one of the leading changemakers in the country.</p>`
        },
        gayathri: {
            name: "Gayathri Krishna",
            role: "Trustee",
            text: `<p>Gayathri Krishna is a global technology transformation leader with over 30 years of experience across digital banking, core modernization, and large-scale system integration. She has held leadership roles at Wipro, KPMG, IBM, and Capco, driving technology-led growth for banks, financial institutions, and government initiatives across India, the US, Europe, the Middle East, Africa, and ASEAN.</p>
                   <p>She brings deep expertise in scaling digital platforms, leading managed services, and building cross-cultural teams for sustainable impact. She is certified by Harvard Kennedy School in “Leading Green Growth: Economic Strategies for a Low-Carbon World.”</p>`
        },
        ashish: {
            name: "Ashish Kasi",
            role: "Trustee",
            text: `<p>Ashish Kasi has 20+ years of experience in the IT industry and is currently the Vice President & GM India for Conviva. Prior to this, he was VP & Site lead at [24]7.ai, CTO at CapillaryTechnologies and spent 10 years with Yahoo! as their head of engineering for Yahoo! Small Business.</p>
                   <p>Here he helped build a suite of profitable services ranging from ‘content to commerce’ that enables small and mid businesses to be successful online. Prior to Yahoo!, Ashish has held leadership roles at various US start-ups and high-tech companies with a focus on the learning management, commerce and finance sectors. Ashish is a founding member of Jeevajala, a non-profit organization that is focused on rain water harvesting. He is also a member of a governing council that runs Adarsha Vidya Samsthe (AVS), a school in rural Karnataka and a client of CLT digital content.</p>`
        },
        kentaro: {
            name: "Kentaro Toyama",
            role: "Advisory Board Member",
            text: `<p>Kentaro Toyama is W.K. Kellogg Associate Professor of Community Information at the University of Michigan School of Information, a fellow of the Dalai Lama Center for Ethics and Transformative Values at MIT, and author of Geek Heresy: Rescuing Social Change from the Cult of Technology.</p>
                   <p>Previously, he was a researcher at UC Berkeley and assistant managing director of Microsoft Research India, which he co-founded in 2005. At MSR India, he started the Technology for Emerging Markets research group, which conducts interdisciplinary research to understand how the world’s poorer communities interact with electronic technology and to invent new ways for technology to support their socio-economic development. The award-winning group is known for projects such as MultiPoint, Text-Free User Interfaces, and Digital Green. Kentaro co-founded the IEEE/ACM International Conference on Information and Communication Technologies and Development (ICTD) to provide a global platform for rigorous academic research in this field. He is also co-editor-in-chief of the journal Information Technologies and International Development.</p>
                   <p>Prior to his time in India, Kentaro did computer vision and multimedia research at Microsoft Research in Redmond, WA, USA and Cambridge, UK, and taught mathematics at Ashesi University in Accra, Ghana.</p>
                   <p>Kentaro graduated from Yale with a PhD in Computer Science and from Harvard with a bachelor’s degree in Physics. He was born in Tokyo, raised in both Japan and the United States, and now lives in Ann Arbor, Michigan.</p>`
        },
        rohit: {
            name: "Rohit Setty",
            role: "Advisory Board Member",
            text: `<p>Rohit Setty is a recent USIEF Fulbright-Nehru Fellow with the NCERT and graduate from the University of Michigan with a doctoral degree in Teaching & Teacher Education.</p>
                   <p>His work centers on the intersections of policy and practice as they relate to in-service teacher education in India and abroad. His research explores the policies, the practices, and the possibilities of Indian teacher education. Rohit completed his MA in South Asian Studies from the University of Michigan in 2007, where he explored educational issues in India through the multiple perspectives of history, anthropology, economics, business, religion, and architecture.</p>
                   <p>He has taught in Virginia, Japan, and New Zealand as a secondary school teacher and has worked with in-service and pre-service Social Studies teachers across Michigan and in India over the last eight years. Additionally, Rohit is partner of a 30-year old family-owned building systems design engineering consulting company which has offices in Virginia, D.C., New York, and India. He is a father of two young children and resides in Virginia.</p>`
        },
        marina: {
            name: "Marina Kundu",
            role: "Advisory Board Member",
            text: `<p>With over 25 years of experience in education teaching and management, Marina Kundu has deep knowledge of the industry and a lifelong passion for education.</p>
                   <p>Before joining the Board at CLT India, Marina held several top management positions, including VP for Learning Innovation at the Financial Times | IE Business School Corporate Learning Alliance, Associate Dean of HEC Paris School of Management in charge of Executive Education, and Dean of Undergraduate Studies at Sciences Po Paris.</p>
                   <p>With a Master’s from Yale University, she started her career teaching French literature and language at Yale University, the University of Geneva, and Chatham University in Pittsburgh.</p>
                   <p>Marina is Indian-Italian, and currently lives in Paris.</p>`
        },
        francis: {
            name: "Francis Vérillaud",
            role: "Advisory Board Member",
            text: `<p>Francis Vérillaud, Vice President of Sciences Po since 2002 and the director of international affairs and exchanges at Sciences Po since 1995, has been the principle architect of Sciences Po’s internationalization strategy. He has vigorously pursued the institution’s growing engagement with international students and faculty, negotiating and helping launch educational and scientific programs such as the dual degrees with Columbia University and the London School of Economics and Political Sciences and many others, including the Global Public Policy Network.</p>
                   <p>Before coming to Sciences Po, Francis Vérillaud held several positions in the French Ministry of Foreign Affairs, including postings in Washington and Santiago, Chile. He has taught economics classes in several French lycées, at the Universidad Católica de Chile and at Sciences Po. Francis Vérillaud is a graduate in philosophy from Paris University Nanterre and a graduate from Sciences Po Paris. He was awarded Chevalier dans l’Ordre des Palmes académiques and he is Chevalier dans l’Ordre de la légion d’honneur.</p>`
        },
        farookh: {
            name: "Farookh Syed",
            role: "Advisory Board Member",
            text: `<p>Farookh Syed is a Six Sigma Master Black Belt with extensive experience in business transformation, business strategy development and execution. Mr. Syed has proven ability to build a culture of identifying and eliminating waste and inefficiency to drive profitability and optimal operational and financial efficiency. He is known for empowering people at all levels from shop floor to C-Suite officers to create value-added and customer centric organisations and has extensive international experience.</p>
                   <p>His specialities are Strategic Planning and Execution, Building a Culture of Continuous Improvement, Certified Lean Six Sigma Master Black Belt, Project Management Professional (PMP) by PMI, Coaching/Training/Mentoring and Financial Analysis.</p>`
        },
        ian: {
            name: "Ian Correa",
            role: "Advisory Board Member",
            text: `<p>Ian Correa is a visionary leader with over 30 years of experience driving transformative change in education, skilling, and community development. As CEO of the Hope Foundation, he has scaled the organization into a nationwide network, overseeing 70+ projects and leading a team of 500 across India. His work has fostered impactful partnerships with Fortune 500 companies, government agencies, and global NGOs.</p>
                   <p>A passionate advocate for equitable and tech-enabled education, Ian has spearheaded initiatives that bring digital literacy, STEM learning, and future-ready skills to underserved communities—reaching over 100,000 children. His “Cradle to Career” model promotes holistic development, bridging education and employability with innovation at its core. Ian has been a Chevening Gurukul Fellow at the London School of Economics and serves on the Global Council of HOPE Worldwide, influencing education and development strategies worldwide.</p>`
        },
        sunil: {
            name: "Sunil Rangreji",
            role: "Chief Executive Officer (CEO)",
            text: `<p>Sunil holds a BE degree in Electronics and a Master’s in Practicing Management from INSEAD, France. With over 30 years of experience in the IT industry, he has served as Vice President of IT at Informatica and has held leadership roles at global companies such as Oracle, NetApp, Accenture, and Wipro.</p>
                   <p>In 2009, while pursuing his master’s program at INSEAD, Sunil discovered a strong passion for practice-based teaching and learning. Since then, he has been actively involved in the education sector, collaborating with numerous schools and colleges. In 2011, Sunil took a break from his corporate career to join Mission10X, a Wipro initiative aimed at transforming engineering education in India. During this period, he provided training and mentorship to engineering college and school leaders, faculty members on academic leadership, as well as guided students on entrepreneurship employability skills.</p>
                   <p>Sunil has also worked as a guest lecturer at BITS Pilani, where he taught Strategy, Innovation, and Digital Transformation as part of their Work Integrated Learning Programs. Additionally, he has been serving as an advisory board member for some colleges and NGOs.</p>
                   <p>Over the years, Sunil has participated as a speaker at various industry & education events, including national conferences on emerging trends, Zinnov CIO Conclave, NASSCOM conferences, IDC Directions, TUV ITSM conferences, QAI ITSM conferences, and the BSI-UK Conference.</p>
                   <p>Sunil is deeply passionate about equipping young India with quality education and enable them for entrepreneurship and employability. He finds immense joy in teaching and sharing his combined industry and academic experience with working professionals, educators, and students.</p>`
        }
    };

    // Modal elements
    const modal = document.getElementById('bioModal');
    const modalName = document.getElementById('modalName');
    const modalRole = document.getElementById('modalRole');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');

    // Click trigger on cards
    document.querySelectorAll('.member-card').forEach(card => {
        card.addEventListener('click', () => {
            const memberId = card.getAttribute('data-member');
            const data = bios[memberId];
            if (data) {
                modalName.innerText = data.name;
                modalRole.innerText = data.role;
                modalBody.innerHTML = data.text;
                modal.classList.add('active');
            }
        });
    });

    // Close click
    modalClose?.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Outside click close
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Esc key close
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
});
