import { jsPDF } from 'jspdf';
import { COURSES_DATA } from '../data/coursesData';

interface LeadData {
  fullName: string;
  phone: string;
  email: string;
  preferredCourse: string;
}

export const generateBrochurePdf = (lead: LeadData): void => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Background Header Bar (Deep Navy #0B1120)
  doc.setFillColor(11, 17, 32);
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Cyan Accent Line (#00F2FE)
  doc.setFillColor(0, 242, 254);
  doc.rect(0, 42, pageWidth, 2.5, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('JS DEVELOPERS', 15, 18);

  // Tagline
  doc.setTextColor(0, 242, 254);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('"WHERE SKILLS BECOME CAREERS"', 15, 26);

  // Accreditation & Project of ASCI
  doc.setTextColor(200, 215, 240);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('A Project of ASCI · Software House Certification · Lahore, Pakistan', 15, 34);

  // Date issued
  doc.setTextColor(160, 180, 210);
  doc.setFontSize(8);
  doc.text(`Issued for: ${lead.fullName || 'Prospective Candidate'}`, pageWidth - 15, 20, { align: 'right' });
  doc.text(`Target Course: ${lead.preferredCourse || 'All Courses'}`, pageWidth - 15, 26, { align: 'right' });
  doc.text(`Generated: ${new Date().toLocaleDateString('en-GB')}`, pageWidth - 15, 32, { align: 'right' });

  // Body: Section 1: Overview
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('1. INSTITUTION & LEADERSHIP', 15, 54);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(51, 65, 85);
  const introText = 
    'JS Developers is a premier technology training institute and software house in Lahore, Pakistan. ' +
    'Represented by Lead Developers Muhammad Saboor ul iman and Muhammad Jahanzaib Akhtar, our mission is turning ' +
    'student aptitude into global commercial software capabilities with direct Software House Certification.';
  doc.text(doc.splitTextToSize(introText, pageWidth - 30), 15, 61);

  // Body: Section 2: Full Course Directory
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('2. FULL COURSE DIRECTORY & CURRICULUM SYLLABUS', 15, 78);

  let currentY = 86;

  COURSES_DATA.forEach((course, index) => {
    if (currentY > 240) {
      doc.addPage();
      // Draw minimal header on page 2
      doc.setFillColor(11, 17, 32);
      doc.rect(0, 0, pageWidth, 16, 'F');
      doc.setFillColor(0, 242, 254);
      doc.rect(0, 16, pageWidth, 1.5, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('JS DEVELOPERS — COURSE DIRECTORY CONTINUED', 15, 11);
      currentY = 28;
    }

    // Course Title & Category
    doc.setTextColor(2, 132, 199);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.text(`${index + 1}. ${course.title}`, 15, currentY);

    // Duration & Tag
    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text(`Duration: ${course.duration}  |  Level: ${course.level}  |  ASCI Certified`, pageWidth - 15, currentY, { align: 'right' });

    currentY += 5;

    // Tools
    doc.setTextColor(71, 85, 105);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text(`Key Stack: ${course.tools.join(', ')}`, 15, currentY);

    currentY += 4.5;

    // Description
    doc.setTextColor(71, 85, 105);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    const desc = doc.splitTextToSize(course.description, pageWidth - 30);
    doc.text(desc, 15, currentY);

    currentY += desc.length * 4 + 4;
  });

  // Footer: Contact & Verification on last page
  if (currentY > 230) {
    doc.addPage();
    currentY = 30;
  } else {
    currentY = Math.max(currentY + 6, 230);
  }

  // Footer Box (Navy Background)
  doc.setFillColor(11, 17, 32);
  doc.rect(15, currentY, pageWidth - 30, 48, 'F');
  doc.setFillColor(0, 242, 254);
  doc.rect(15, currentY, pageWidth - 30, 1.5, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('OFFICIAL CONTACT & ADMISSION DESK', 20, currentY + 9);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(203, 213, 225);
  doc.text('• Mobile 1: +92 329 4589432 (Admissions & WhatsApp)', 20, currentY + 16);
  doc.text('• Mobile 2: +92 326 4243566 (Student Inquiries)', 20, currentY + 22);
  doc.text('• Official Email: jsdevelopersofficial@gmail.com', 20, currentY + 28);
  doc.text('• Direct Devs: mrssaboor04@gmail.com | jahanzaib2721@gmail.com', 20, currentY + 34);
  doc.text('• Campus Location: Lahore, Pakistan | Web: www.jsdevelopers.com', 20, currentY + 40);

  doc.setTextColor(0, 242, 254);
  doc.setFont('helvetica', 'bold');
  doc.text('Social Media: Twitter/X @jsdevelopers | Instagram @jsdevelopers', pageWidth - 20, currentY + 40, { align: 'right' });

  // Save the PDF
  const cleanName = (lead.fullName || 'Candidate').replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`JS_Developers_Official_Brochure_${cleanName}.pdf`);
};
