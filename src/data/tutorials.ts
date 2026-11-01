import type { Tutorial } from '../types';

export const tutorials: Tutorial[] = [
  // ---------- Photoshop ----------
  {
    id: 'ps-remove-background',
    program: 'photoshop',
    title: 'ลบพื้นหลังด้วย Select Subject',
    summary: 'ตัดวัตถุออกจากพื้นหลังอย่างรวดเร็ว พร้อมปรับขอบให้เนียนด้วย Select and Mask',
    level: 'beginner',
    minutes: 10,
    tags: ['ลบพื้นหลัง', 'selection', 'mask'],
    steps: [
      {
        title: 'เปิดภาพและปลดล็อกเลเยอร์',
        body: 'เปิดไฟล์ภาพ แล้วดับเบิลคลิกที่เลเยอร์ Background เพื่อเปลี่ยนเป็น Layer 0 จะได้แก้ไขแบบไม่ทำลายต้นฉบับได้',
      },
      {
        title: 'สร้าง Selection ของวัตถุ',
        body: 'ไปที่ Select > Subject หรือใช้ Object Selection Tool ลากกรอบรอบวัตถุ Photoshop จะเลือกวัตถุให้อัตโนมัติ',
      },
      {
        title: 'ปรับขอบด้วย Select and Mask',
        body: 'กด Select and Mask เปิดโหมด View เป็น On Black แล้วปรับ Smooth และ Shift Edge เล็กน้อย ใช้ Refine Edge Brush ลูบตรงขอบเส้นผมหรือขน',
      },
      {
        title: 'ส่งออกเป็น Layer Mask',
        body: 'ที่ Output To เลือก Layer Mask แล้วกด OK จากนั้นวางพื้นหลังใหม่ไว้ใต้เลเยอร์และตรวจขอบอีกครั้งที่ซูม 100%',
      },
    ],
    tips: ['ใช้ Layer Mask แทนการลบด้วย Eraser เพื่อย้อนกลับได้เสมอ', 'ภาพที่พื้นหลังต่างจากวัตถุชัดเจนจะได้ผลดีกว่า'],
  },
  {
    id: 'ps-color-grading',
    program: 'photoshop',
    title: 'ปรับโทนสีภาพด้วย Adjustment Layers',
    summary: 'สร้างโทนสีแบบ Cinematic ด้วย Curves, Color Balance และ Gradient Map',
    level: 'intermediate',
    minutes: 15,
    tags: ['โทนสี', 'color grading', 'curves'],
    steps: [
      {
        title: 'ปรับแสงพื้นฐานด้วย Curves',
        body: 'เพิ่ม Adjustment Layer แบบ Curves ดึงจุด Highlight ขึ้นเล็กน้อยและดันจุด Shadow ลงเพื่อเพิ่ม Contrast แบบนุ่ม ๆ',
      },
      {
        title: 'แต่งโทนด้วย Color Balance',
        body: 'ที่ Shadows ดันไปทาง Cyan/Blue และที่ Highlights ดันไปทาง Orange/Yellow จะได้โทน Teal & Orange ที่นิยม',
      },
      {
        title: 'เพิ่มมิติด้วย Gradient Map',
        body: 'เพิ่ม Gradient Map เลือกไล่สีม่วงไปส้ม ตั้ง Blend Mode เป็น Soft Light และลด Opacity เหลือ 15-25%',
      },
      {
        title: 'จัดกลุ่มและเปรียบเทียบ',
        body: 'รวม Adjustment ทั้งหมดไว้ใน Group แล้วกดเปิด/ปิดตา เพื่อเทียบก่อน-หลัง ปรับความแรงด้วย Opacity ของ Group',
      },
    ],
    tips: ['อย่าดันสีแรงทุกจุด ให้เลือกสีเด่นแค่ 2 สี', 'ใช้ Layer Mask คุมให้โทนสีลงเฉพาะบริเวณที่ต้องการ'],
  },
  {
    id: 'ps-dodge-burn',
    program: 'photoshop',
    title: 'รีทัชผิวด้วย Dodge & Burn',
    summary: 'เก็บผิวให้เรียบเนียนแต่ยังเห็นเท็กซ์เจอร์ ด้วยเทคนิค Dodge & Burn แบบไม่ทำลายภาพ',
    level: 'advanced',
    minutes: 25,
    tags: ['รีทัช', 'ผิว', 'dodge burn'],
    steps: [
      {
        title: 'สร้างเลเยอร์เทา 50%',
        body: 'สร้างเลเยอร์ใหม่ ไปที่ Edit > Fill เลือก 50% Gray ตั้ง Blend Mode เป็น Soft Light (ทำ 2 เลเยอร์: Dodge และ Burn)',
      },
      {
        title: 'ตั้งค่าแปรง',
        body: 'ใช้ Brush นุ่ม (Hardness 0%) ตั้ง Flow ประมาณ 3-5% และเลือกสีขาวสำหรับ Dodge สีดำสำหรับ Burn',
      },
      {
        title: 'ไล่แสงเงาตามโครงหน้า',
        body: 'ใช้สีขาวเพิ่มแสงบริเวณที่ควรสว่าง เช่น สันจมูก โหนกแก้ม และสีดำเพิ่มเงาตามร่องที่ต้องการ ลากเบา ๆ ทีละชั้น',
      },
      {
        title: 'เก็บรอยด้วย Healing Brush',
        body: 'สร้างเลเยอร์ว่างแล้วเลือก Healing Brush ตั้ง Sample เป็น Current & Below เก็บสิวหรือรอยเล็ก ๆ แล้วรวมเป็น Group',
      },
    ],
    tips: ['ซูมออกมาดูภาพรวมบ่อย ๆ เพื่อไม่ให้เนียนจนเหมือนพลาสติก', 'เก็บ Texture ผิวไว้เสมอ'],
  },

  // ---------- Illustrator ----------
  {
    id: 'ai-pen-tool',
    program: 'illustrator',
    title: 'ฝึกใช้ Pen Tool ให้คล่อง',
    summary: 'เข้าใจ Anchor Point และ Handle เพื่อวาดเส้นโค้งสวยด้วยจุดให้น้อยที่สุด',
    level: 'beginner',
    minutes: 12,
    tags: ['pen tool', 'เส้นโค้ง', 'พื้นฐาน'],
    steps: [
      {
        title: 'วาดเส้นตรงด้วยการคลิก',
        body: 'กด P เพื่อเลือก Pen Tool แล้วคลิกทีละจุดเพื่อสร้างเส้นตรง กด Shift ค้างไว้เพื่อล็อกมุม 45 องศา',
      },
      {
        title: 'สร้างเส้นโค้งด้วยการคลิกแล้วลาก',
        body: 'คลิกค้างที่จุดใหม่แล้วลากเมาส์ จะเกิด Handle ที่ควบคุมความโค้ง ลากไปทิศทางเดียวกับเส้นที่จะวาดต่อ',
      },
      {
        title: 'แก้ Handle ด้วย Alt/Option',
        body: 'กด Alt (Windows) หรือ Option (Mac) ค้างที่ Handle เพื่อแยกทิศทางสองข้าง ใช้เมื่อต้องการเปลี่ยนทิศของเส้นโค้งอย่างฉับพลัน',
      },
      {
        title: 'ปิดเส้นและปรับแก้',
        body: 'คลิกที่จุดแรกเพื่อปิด Path จากนั้นใช้ Direct Selection Tool (A) เลือกจุดเพื่อแก้ไข ลดจำนวนจุดให้เหลือน้อยที่สุดเพื่อให้เส้นเนียน',
      },
    ],
    tips: ['วางจุดที่ปลายสุดของส่วนโค้ง (extrema) จะใช้จุดน้อยลง', 'ฝึกลากตามเส้นภาพ Template บน Layer ที่ล็อกไว้'],
  },
  {
    id: 'ai-logo-shapes',
    program: 'illustrator',
    title: 'ออกแบบโลโก้ด้วย Shapes และ Pathfinder',
    summary: 'สร้างโลโก้เรียบ ๆ จากรูปทรงพื้นฐาน จัดวางด้วย Align และรวมรูปด้วย Pathfinder',
    level: 'intermediate',
    minutes: 20,
    tags: ['โลโก้', 'pathfinder', 'shape'],
    steps: [
      {
        title: 'ร่างด้วยรูปทรงพื้นฐาน',
        body: 'ใช้ Ellipse (L) และ Rectangle (M) สร้างรูปทรง กด Shift เพื่อคงสัดส่วน ใช้ Live Corners ปรับมุมมนได้ทันที',
      },
      {
        title: 'จัดตำแหน่งด้วย Align',
        body: 'เลือกหลายรูปแล้วเปิด Window > Align เลือก Align to Key Object เพื่อจัดกึ่งกลางหรือชิดขอบให้เป๊ะ',
      },
      {
        title: 'รวม/ตัดรูปด้วย Pathfinder',
        body: 'เปิด Window > Pathfinder ใช้ Unite เพื่อรวมรูป หรือ Minus Front เพื่อเจาะรูปด้านหน้าออกจากด้านหลัง',
      },
      {
        title: 'ตั้งสีและส่งออก SVG',
        body: 'กำหนดสีใน Swatches แล้วไปที่ File > Export > Export As เลือก SVG เพื่อนำไปใช้บนเว็บ หรือ PDF สำหรับงานพิมพ์',
      },
    ],
    tips: ['ทดสอบโลโก้เป็นขาว-ดำก่อน ถ้ายังอ่านออกแปลว่ารูปทรงแข็งแรง', 'ย่อโลโก้ให้เล็กเท่า favicon เพื่อตรวจความชัด'],
  },
  {
    id: 'ai-image-trace',
    program: 'illustrator',
    title: 'แปลงภาพเป็นเวกเตอร์ด้วย Image Trace',
    summary: 'เปลี่ยนสเก็ตช์หรือภาพถ่ายเป็นเวกเตอร์ที่แก้สีและขยายได้',
    level: 'beginner',
    minutes: 10,
    tags: ['image trace', 'เวกเตอร์', 'สเก็ตช์'],
    steps: [
      {
        title: 'วางภาพลงใน Artboard',
        body: 'ใช้ File > Place เลือกภาพสเก็ตช์ที่สแกนหรือถ่ายไว้ ภาพที่คอนทราสต์สูงจะได้ผลดี',
      },
      {
        title: 'เปิด Image Trace',
        body: 'เลือกภาพ แล้วไปที่ Window > Image Trace เลือก Preset เช่น Black and White Logo หรือ 6 Colors',
      },
      {
        title: 'ปรับค่า Threshold',
        body: 'เลื่อน Threshold และ Paths/Noise จนเส้นคมและไม่มีจุดรบกวนมากเกินไป',
      },
      {
        title: 'Expand และจัดระเบียบ',
        body: 'กด Expand เพื่อแปลงเป็น Path จริง จากนั้น Ungroup (Shift+Ctrl/Cmd+G) แล้วลบส่วนที่ไม่ต้องการหรือเปลี่ยนสีได้ตามต้องการ',
      },
    ],
    tips: ['ถ้าเส้นขาดให้เพิ่ม Threshold หรือลองสแกนที่ 300 DPI', 'ลบพื้นหลังสีขาวด้วยการเลือกแล้วกด Delete หลัง Expand'],
  },

  // ---------- After Effects ----------
  {
    id: 'ae-first-animation',
    program: 'after-effects',
    title: 'อนิเมชันแรกด้วย Keyframe และ Easy Ease',
    summary: 'ทำให้รูปทรงเคลื่อนที่อย่างนุ่มนวลด้วย Keyframe และ Graph Editor',
    level: 'beginner',
    minutes: 15,
    tags: ['keyframe', 'easy ease', 'พื้นฐาน'],
    steps: [
      {
        title: 'สร้าง Composition',
        body: 'ไปที่ Composition > New Composition ตั้งค่า 1920x1080, 30 fps, ความยาว 5 วินาที จากนั้นวาดรูปทรงด้วย Ellipse Tool',
      },
      {
        title: 'ใส่ Keyframe ตำแหน่ง',
        body: 'เลือกเลเยอร์ กด P เพื่อเปิด Position คลิกนาฬิกา (Stopwatch) ที่เฟรมแรก แล้วเลื่อน Playhead ไปท้าย ๆ แล้วย้ายวัตถุ',
      },
      {
        title: 'ทำให้ไหลลื่นด้วย Easy Ease',
        body: 'เลือก Keyframe ทั้งหมดแล้วกด F9 เพื่อใส่ Easy Ease การเคลื่อนไหวจะเริ่มและหยุดแบบนุ่มนวล',
      },
      {
        title: 'ปรับใน Graph Editor',
        body: 'กดปุ่ม Graph Editor แล้วดึง Handle เพื่อกำหนดความเร็ว ยิ่งชันยิ่งเร็ว ลองทำให้ช่วงต้นช้าและช่วงท้ายเร็วขึ้นเพื่อให้ได้จังหวะ',
      },
    ],
    tips: ['กด U เพื่อดูเฉพาะพร็อพเพอร์ตีที่มี Keyframe', 'กด Spacebar เพื่อพรีวิว และ 0 (Numpad) เพื่อ RAM Preview'],
  },
  {
    id: 'ae-text-animator',
    program: 'after-effects',
    title: 'ทำข้อความขยับด้วย Text Animator',
    summary: 'ให้ตัวอักษรค่อย ๆ ปรากฏทีละตัวหรือทีละคำด้วย Range Selector',
    level: 'intermediate',
    minutes: 20,
    tags: ['text', 'animator', 'ไตเติล'],
    steps: [
      {
        title: 'สร้างข้อความ',
        body: 'ใช้ Type Tool (Ctrl/Cmd+T) พิมพ์ข้อความลงใน Composition แล้วจัดตำแหน่งกึ่งกลาง',
      },
      {
        title: 'เพิ่ม Animator',
        body: 'ที่เลเยอร์ข้อความ กด Animate > Opacity จะได้ Animator พร้อม Range Selector ตั้ง Opacity เป็น 0%',
      },
      {
        title: 'ใส่ Keyframe ที่ Range Selector',
        body: 'ใส่ Keyframe ที่ Start จาก 0% ไป 100% เมื่อ Start เลื่อน ตัวอักษรจะค่อย ๆ ปรากฏ',
      },
      {
        title: 'ปรับแบบทีละคำ',
        body: 'เปิด Advanced > Based On เลือก Words และปรับ Smoothness เพื่อให้การปรากฏนุ่มนวล ลองเพิ่ม Position หรือ Scale ใน Animator เดียวกัน',
      },
    ],
    tips: ['ใช้ Preset ในแผง Effects & Presets เพื่อดูตัวอย่างการตั้งค่า', 'ใช้ Ease เดียวกันทั้ง Title เพื่อให้งานดูเป็นระบบ'],
  },
  {
    id: 'ae-expressions',
    program: 'after-effects',
    title: 'Expression: wiggle และ loopOut',
    summary: 'ลดงาน Keyframe ด้วยโค้ดสั้น ๆ ให้วัตถุสั่นหรือวนลูปได้ไม่รู้จบ',
    level: 'advanced',
    minutes: 25,
    tags: ['expression', 'wiggle', 'loop'],
    steps: [
      {
        title: 'เปิดช่อง Expression',
        body: 'กด Alt/Option แล้วคลิกนาฬิกาของพร็อพเพอร์ตีที่ต้องการ เช่น Position จะมีช่องสำหรับพิมพ์ Expression',
      },
      {
        title: 'ใส่ wiggle',
        body: 'พิมพ์ wiggle(2, 30) แปลว่าสั่น 2 ครั้งต่อวินาที ด้วยระยะ 30 พิกเซล เหมาะกับกล้องสั่นหรือวัตถุลอย',
      },
      {
        title: 'ทำลูปด้วย loopOut',
        body: 'ใส่ Keyframe 2-3 จุด แล้วใส่ loopOut("pingpong") ในช่อง Expression เพื่อให้อนิเมชันเล่นไป-กลับต่อเนื่อง หรือใช้ loopOut("cycle") เพื่อวนจากต้น',
      },
      {
        title: 'ควบคุมด้วย Slider',
        body: 'เพิ่ม Effect > Expression Controls > Slider Control แล้วลาก Pick Whip ไปที่ค่าใน wiggle เพื่อปรับความแรงได้โดยไม่ต้องแก้โค้ด',
      },
    ],
    tips: ['ถ้ามีแถบสีแดงแจ้ง Error ให้ตรวจวงเล็บและเครื่องหมายคำพูด', 'ตั้งชื่อ Slider ให้สื่อความหมายเพื่อใช้งานซ้ำได้ง่าย'],
  },

  // ---------- Premiere Pro ----------
  {
    id: 'pr-basic-edit',
    program: 'premiere-pro',
    title: 'ตัดต่อวิดีโอพื้นฐานตั้งแต่ต้นจนจบ',
    summary: 'เริ่มโปรเจกต์ เรียงคลิป ตัดส่วนเกิน และ Export ไฟล์พร้อมอัปโหลด',
    level: 'beginner',
    minutes: 15,
    tags: ['ตัดต่อ', 'export', 'timeline'],
    steps: [
      {
        title: 'สร้างโปรเจกต์และนำเข้าคลิป',
        body: 'เปิด File > New > Project ตั้งชื่อ แล้วดับเบิลคลิกในแผง Project เพื่อ Import ไฟล์วิดีโอ เสียง และรูปภาพทั้งหมด',
      },
      {
        title: 'สร้าง Sequence จากคลิป',
        body: 'ลากคลิปแรกลงไอคอน New Item หรือคลิกขวา New Sequence From Clip เพื่อให้ตั้งค่าตรงกับวิดีโอ',
      },
      {
        title: 'ตัดและลบส่วนเกิน',
        body: 'กด C เพื่อใช้ Razor Tool ตัดคลิป จากนั้นเลือกส่วนที่ไม่ต้องการแล้วกด Shift+Delete (Ripple Delete) ช่องว่างจะปิดให้อัตโนมัติ',
      },
      {
        title: 'Export วิดีโอ',
        body: 'กด Ctrl/Cmd+M เลือก Format H.264 และ Preset ที่ตรงกับแพลตฟอร์ม เช่น YouTube 1080p Full HD แล้วกด Export',
      },
    ],
    tips: ['กด J/K/L เพื่อเล่นย้อน/หยุด/เดินหน้า ช่วยให้ตัดต่อไวขึ้น', 'กด Ctrl/Cmd+S บ่อย ๆ'],
  },
  {
    id: 'pr-lumetri-color',
    program: 'premiere-pro',
    title: 'ปรับสีวิดีโอด้วย Lumetri Color',
    summary: 'แก้ White Balance ปรับแสง และสร้างลุคด้วย LUT ในแผงเดียว',
    level: 'intermediate',
    minutes: 18,
    tags: ['lumetri', 'ปรับสี', 'lut'],
    steps: [
      {
        title: 'เปิด Color Workspace',
        body: 'เลือก Workspace Color ที่แถบด้านบน แผง Lumetri Color จะแสดงขึ้นพร้อม Scopes สำหรับดูค่าแสง',
      },
      {
        title: 'แก้ Basic Correction',
        body: 'ปรับ White Balance ให้ผิวและของสีขาวดูถูกต้อง จากนั้นปรับ Exposure, Contrast, Highlights และ Shadows โดยดู Waveform ประกอบ',
      },
      {
        title: 'สร้างลุคด้วย Creative และ Curves',
        body: 'ใส่ LUT ในส่วน Creative แล้วลด Intensity ลง จากนั้นใช้ Curves ปรับรายละเอียดของ RGB หรือ Hue Saturation Curves',
      },
      {
        title: 'ใช้ Adjustment Layer',
        body: 'สร้าง Adjustment Layer (File > New) วางคลุมคลิปทั้งหมด แล้วใส่ Lumetri ที่เลเยอร์นี้เพื่อให้ทั้งซีนสีสอดคล้องกัน',
      },
    ],
    tips: ['แก้สีให้ถูกต้องก่อน แล้วจึงแต่งลุค', 'ดูผลบนจอที่ปรับเทียบสีแล้วหากทำได้'],
  },
  {
    id: 'pr-audio-cleanup',
    program: 'premiere-pro',
    title: 'ทำเสียงพูดให้ชัดด้วย Essential Sound',
    summary: 'ลดเสียงรบกวน ปรับระดับเสียง และทำให้ดนตรีลดลงเมื่อมีเสียงพูด',
    level: 'intermediate',
    minutes: 12,
    tags: ['เสียง', 'essential sound', 'audio'],
    steps: [
      {
        title: 'ระบุประเภทเสียง',
        body: 'เปิด Window > Essential Sound เลือกคลิปเสียงพูดแล้วกด Dialogue เพื่อใช้เครื่องมือสำหรับเสียงพูด',
      },
      {
        title: 'ใช้ Enhance Speech',
        body: 'ติ๊ก Enhance Speech เพื่อให้ Premiere ช่วยลดเสียงรบกวนและทำให้เสียงชัดขึ้น ปรับ Strength ตามความเหมาะสม',
      },
      {
        title: 'ปรับความดังให้สม่ำเสมอ',
        body: 'ที่ Loudness กด Auto-Match เพื่อให้ระดับเสียงสม่ำเสมอ โดยทั่วไปเสียงพูดควรอยู่ราว -16 LUFS สำหรับออนไลน์',
      },
      {
        title: 'ทำ Ducking ให้เพลง',
        body: 'เลือกคลิปเพลงแล้วกด Music เปิด Ducking เลือกคลิปเสียงพูดเป็นตัวอ้างอิง แล้วกด Generate Keyframes ให้เพลงเบาลงอัตโนมัติ',
      },
    ],
    tips: ['ใช้หูฟังตรวจเสียงก่อน Export เสมอ', 'อัดเสียงในห้องที่เงียบจะประหยัดเวลาแก้มากที่สุด'],
  },

  // ---------- Procreate ----------
  {
    id: 'pc-brush-basics',
    program: 'procreate',
    title: 'ตั้งค่าแปรงให้ตรงสไตล์คุณ',
    summary: 'ใช้ Brush Studio ปรับแรงกด ความลื่น และบันทึกแปรงของตัวเอง',
    level: 'beginner',
    minutes: 12,
    tags: ['แปรง', 'brush studio', 'พื้นฐาน'],
    steps: [
      {
        title: 'เลือกแปรงเริ่มต้น',
        body: 'แตะไอคอนแปรงเพื่อเปิด Brush Library เลือกแปรงในหมวด Inking สำหรับลายเส้น หรือ Painting สำหรับลงสี',
      },
      {
        title: 'ทำสำเนาก่อนแก้ไข',
        body: 'ปัดแปรงไปทางซ้ายแล้วกด Duplicate เพื่อไม่ให้แปรงต้นฉบับเสียหาย จากนั้นแตะแปรงที่ซ้ำเพื่อเปิด Brush Studio',
      },
      {
        title: 'ปรับ Stroke และ Apple Pencil',
        body: 'ที่ Stroke Properties ปรับ Streamline เพื่อให้เส้นนุ่ม และที่ Apple Pencil ปรับกราฟ Pressure ให้ตอบสนองตามน้ำหนักมือของคุณ',
      },
      {
        title: 'ทดสอบและบันทึก',
        body: 'วาดเส้นทดลองในช่อง Drawing Pad ด้านขวา ถ้าพอใจให้กด Done แล้วตั้งชื่อแปรงให้จำง่าย',
      },
    ],
    tips: ['ใช้แปรงไม่เกิน 3-4 แบบต่อภาพเพื่อให้สไตล์ภาพเป็นหนึ่งเดียว', 'กดนิ้วค้างที่สีเพื่อดูดสี (Eyedropper) ได้เร็ว'],
  },
  {
    id: 'pc-layers-clipping',
    program: 'procreate',
    title: 'Layers, Clipping Mask และ Alpha Lock',
    summary: 'แยกเลเยอร์ลายเส้น สี และเงา เพื่อแก้ไขง่ายและลงสีไม่เลอะขอบ',
    level: 'beginner',
    minutes: 14,
    tags: ['layer', 'clipping mask', 'alpha lock'],
    steps: [
      {
        title: 'แยกเลเยอร์ลายเส้น',
        body: 'เปิดแผง Layers แล้วแตะ + เพื่อสร้างเลเยอร์ใหม่ วาดลายเส้นไว้ในเลเยอร์เดียวและตั้งชื่อให้ชัดเจน',
      },
      {
        title: 'ลงสีด้วย Clipping Mask',
        body: 'สร้างเลเยอร์ใหม่เหนือเลเยอร์สีพื้น แตะที่เลเยอร์แล้วเลือก Clipping Mask สีจะอยู่ในขอบเขตของเลเยอร์ด้านล่างเท่านั้น',
      },
      {
        title: 'ใช้ Alpha Lock',
        body: 'ปัดสองนิ้วไปทางขวาบนเลเยอร์เพื่อเปิด Alpha Lock ลงสีใหม่ได้เฉพาะพื้นที่ที่มีสีอยู่แล้ว เหมาะกับการเปลี่ยนสีทั้งก้อนเร็ว ๆ',
      },
      {
        title: 'เพิ่มเงาด้วย Blend Mode',
        body: 'สร้างเลเยอร์ Clipping Mask ใหม่ แตะ N ที่เลเยอร์ แล้วเปลี่ยนเป็น Multiply ใช้สีม่วงอ่อนวาดเงา จะได้เงาที่สดและเป็นธรรมชาติ',
      },
    ],
    tips: ['รวมเลเยอร์เป็น Group เมื่อมีมากกว่า 10 ชั้น', 'ปัดสามนิ้วลงเพื่อ Copy/Paste เมนูลัด'],
  },
  {
    id: 'pc-animation-assist',
    program: 'procreate',
    title: 'ทำแอนิเมชันสั้นด้วย Animation Assist',
    summary: 'วาดทีละเฟรม ดู Onion Skin และส่งออกเป็น GIF หรือวิดีโอ',
    level: 'intermediate',
    minutes: 20,
    tags: ['แอนิเมชัน', 'animation assist', 'gif'],
    steps: [
      {
        title: 'เปิด Animation Assist',
        body: 'ไปที่ Actions > Canvas แล้วเปิด Animation Assist เลเยอร์แต่ละชั้นจะกลายเป็นหนึ่งเฟรม',
      },
      {
        title: 'วาดเฟรมต่อเฟรม',
        body: 'แตะ Add Frame เพื่อเพิ่มเฟรม วาดท่าทางต่อเนื่องกัน ใช้ Onion Skin ดูเฟรมก่อนหน้าเพื่อให้การเคลื่อนไหวต่อเนื่อง',
      },
      {
        title: 'ตั้งค่า FPS และ Loop',
        body: 'ที่ Settings ปรับ Frames Per Second เช่น 8-12 fps สำหรับสไตล์วาดมือ และเลือก Loop เพื่อเล่นวนซ้ำ',
      },
      {
        title: 'ส่งออกไฟล์',
        body: 'ไปที่ Actions > Share เลือก Animated GIF, Animated PNG หรือ Animated MP4 แล้วบันทึกลงเครื่องหรือส่งต่อได้ทันที',
      },
    ],
    tips: ['เริ่มด้วยแอนิเมชันสั้น 4-8 เฟรม เช่น ลูกบอลเด้ง', 'ตั้งพื้นหลังเป็นเลเยอร์ Background ที่ติ๊ก Include เพื่อให้ทุกเฟรมมีพื้นหลัง'],
  },
];

export function getTutorial(id: string | undefined): Tutorial | undefined {
  return tutorials.find((t) => t.id === id);
}
