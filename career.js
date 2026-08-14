/* === JOB LISTINGS ===
   To post a new job, copy one of the objects below and add it to the JOBS array.
   To remove a job, delete its object from the array.
*/
let JOBS = [
  {
    id: 'digital-content-developer',
    title: 'Digital Content Developer',
    department: 'e-Patashale',
    location: 'Bangalore',
    type: 'Full-time',
    experience: '2-5 years',
    description: 'We are looking for a creative Digital Content Developer to build engaging NCERT-aligned STEM content in regional languages for our e-Patashale platform.',
    responsibilities: [
      'Develop interactive digital lessons and assessments for K-12 STEM subjects',
      'Convert existing content into regional languages (Kannada, Telugu, etc.)',
      'Work with teachers and subject experts to improve content quality',
      'Test content on our low-cost learning devices and apps'
    ],
    requirements: [
      'Degree in Education, Science, Engineering or a related field',
      'Experience with e-learning content or instructional design',
      'Strong command of English and at least one regional language',
      'Familiarity with tools like Articulate, Canva or PowerPoint'
    ]
  },
  {
    id: 'program-coordinator',
    title: 'Program Coordinator',
    department: 'Early Grade Reading (EGR)',
    location: 'Bangalore',
    type: 'Full-time',
    experience: '3-6 years',
    description: 'We are seeking a Program Coordinator to manage our Early Grade Reading program across partner government schools in Karnataka.',
    responsibilities: [
      'Plan and execute EGR program activities in partner schools',
      'Coordinate with teachers, school heads and government officials',
      'Monitor program data and prepare impact reports',
      'Organize teacher training workshops'
    ],
    requirements: [
      'Master’s degree in Social Work, Education or related field',
      'Experience managing education or community programs',
      'Strong communication and people skills in English and Kannada',
      'Willingness to travel to rural schools'
    ]
  },
  {
    id: 'field-officer',
    title: 'Field Officer',
    department: 'Operations',
    location: 'Karnataka',
    type: 'Field-based',
    experience: '1-3 years',
    description: 'We are looking for energetic Field Officers to support the installation, training and maintenance of digital classrooms in rural schools.',
    responsibilities: [
      'Install and configure digital classroom equipment in schools',
      'Train teachers and students on using CLT content and devices',
      'Provide on-site troubleshooting and maintenance support',
      'Collect feedback and usage data from schools'
    ],
    requirements: [
      'Diploma/Degree in any discipline; technical aptitude preferred',
      'Comfortable travelling across rural Karnataka',
      'Good Kannada and English communication skills',
      'Basic computer hardware knowledge'
    ]
  },
  {
    id: 'web-developer',
    title: 'Web Developer',
    department: 'IT',
    location: 'Bangalore',
    type: 'Full-time',
    experience: '2-4 years',
    description: 'We are hiring a Web Developer to build and maintain CLT India’s websites, learning portals and Google Workspace integrations.',
    responsibilities: [
      'Develop and maintain responsive HTML/CSS/JS pages',
      'Integrate forms with Google Sheets and Apps Script',
      'Build and improve the Jigi and Jigi Jigi learning apps',
      'Ensure website performance, accessibility and SEO'
    ],
    requirements: [
      'Strong HTML, CSS, JavaScript and Git skills',
      'Experience with Google Apps Script, Sheets API or Firebase',
      'Knowledge of responsive design and cross-browser support',
      'Portfolio of past projects required'
    ]
  }
];

const POSITION_OPTIONS = JOBS.map(function (job) { return job.title; });

document.addEventListener('DOMContentLoaded', function () {
  renderJobs();
  populatePositionSelect();

  var form = document.getElementById('careerForm');
  if (form) form.addEventListener('submit', handleApplication);

  loadJobsFromServer();
});

function populatePositionSelect() {
  var positionSelect = document.getElementById('position');
  if (!positionSelect) return;
  var current = positionSelect.value;
  positionSelect.innerHTML = '<option value="">Select a position</option>';
  JOBS.forEach(function (job) {
    var opt = document.createElement('option');
    opt.value = job.title;
    opt.textContent = job.title;
    positionSelect.appendChild(opt);
  });
  if (current) positionSelect.value = current;
}

function loadJobsFromServer() {
  var cb = 'cltJobsCb' + Date.now();
  var script = document.createElement('script');
  var done = false;
  var timer = setTimeout(function () {
    if (done) return;
    done = true;
    delete window[cb];
    console.warn('CLT: Could not load jobs from server. Check APPS_SCRIPT_URL and Apps Script deployment.');
  }, 8000);
  window[cb] = function (jobs) {
    if (done) return;
    done = true;
    clearTimeout(timer);
    delete window[cb];
    if (jobs && jobs.length) {
      JOBS = jobs;
      renderJobs();
      populatePositionSelect();
    }
  };
  script.onerror = function () {
    if (done) return;
    done = true;
    clearTimeout(timer);
    delete window[cb];
    renderJobs();
  };
  script.src = APPS_SCRIPT_URL + '?action=getJobs&callback=' + cb;
  document.head.appendChild(script);
}

function renderJobs() {
  var container = document.getElementById('jobsContainer');
  if (!container) return;

  if (JOBS.length === 0) {
    container.innerHTML =
      '<p class="jobs-empty">No open positions right now. Please check back soon or email us your resume at <a href="mailto:careers@cltindia.org">careers@cltindia.org</a>.</p>';
    return;
  }

  container.innerHTML = JOBS.map(function (job) {
    return '' +
      '<div class="job-card">' +
        '<div class="job-head">' +
          '<div>' +
            '<h3 class="job-title">' + job.title + '</h3>' +
            '<p class="job-meta">' +
              '<span class="job-tag">' + job.department + '</span>' +
              '<span class="job-tag">' + job.location + '</span>' +
              '<span class="job-tag">' + job.type + '</span>' +
            '</p>' +
          '</div>' +
          '<button type="button" class="job-apply-btn" data-position="' + job.title + '">Apply Now</button>' +
        '</div>' +
        '<p class="job-desc">' + job.description + '</p>' +
        '<div class="job-section">' +
          '<h4>What you will do</h4>' +
          '<ul>' + job.responsibilities.map(function (r) { return '<li>' + r + '</li>'; }).join('') + '</ul>' +
        '</div>' +
        '<div class="job-section">' +
          '<h4>What we are looking for</h4>' +
          '<ul>' + job.requirements.map(function (r) { return '<li>' + r + '</li>'; }).join('') + '</ul>' +
        '</div>' +
      '</div>';
  }).join('');
}

document.addEventListener('click', function (e) {
  var btn = e.target.closest('.job-apply-btn');
  if (!btn) return;
  var position = btn.getAttribute('data-position');
  var select = document.getElementById('position');
  if (select && position) {
    select.value = position;
  }
  var formSection = document.getElementById('apply');
  if (formSection) {
    formSection.scrollIntoView({ behavior: 'smooth' });
  }
});

async function handleApplication(e) {
  e.preventDefault();
  var form = e.currentTarget;
  var btn = form.querySelector('.btn-submit');
  var original = btn.textContent;

  var file = document.getElementById('resume').files[0];
  if (!file) {
    alert('Please attach your resume (PDF, DOC or DOCX).');
    return;
  }
  var okTypes = ['application/pdf', 'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  var isDoc = file.name.toLowerCase().endsWith('.pdf') ||
    file.name.toLowerCase().endsWith('.doc') ||
    file.name.toLowerCase().endsWith('.docx');
  if (!okTypes.includes(file.type) && !isDoc) {
    alert('Please upload a PDF, DOC or DOCX file for your resume.');
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    alert('Resume file must be under 5 MB.');
    return;
  }

  var payload = {
    type: 'career',
    name: document.getElementById('appName').value,
    email: document.getElementById('appEmail').value,
    phone: document.getElementById('appPhone').value,
    position: document.getElementById('position').value,
    experience: document.getElementById('experience').value,
    message: document.getElementById('appMessage').value,
    resumeName: file.name,
    resumeType: file.type || 'application/pdf',
    resumeData: ''
  };

  btn.textContent = '⏳ Submitting...';
  btn.disabled = true;

  var reader = new FileReader();
  reader.onload = async function (ev) {
    payload.resumeData = String(ev.target.result).split(',')[1] || '';
    var result = await submitToSheet(payload);

    if (result === null || result.success === true) {
      btn.textContent = '✅ Application Sent!';
      btn.style.background = '#10b981';
      form.reset();
    } else {
      btn.textContent = '❌ ' + (result.error || 'Try again');
      btn.style.background = '#ef4444';
    }

    setTimeout(function () {
      btn.textContent = original;
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);
  };
  reader.onerror = function () {
    btn.textContent = '❌ File read failed';
    btn.style.background = '#ef4444';
    btn.disabled = false;
    setTimeout(function () {
      btn.textContent = original;
      btn.style.background = '';
    }, 4000);
  };
  reader.readAsDataURL(file);
}
