import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.course.count();
  if (count > 0) return;

  const course = await prisma.course.create({
    data: {
      title: "AI学习入门",
      description: "用于整理视频、笔记、测验和项目练习的示例课程。",
      chapters: {
        create: [
          {
            title: "基础概念",
            lessons: {
              create: [
                {
                  title: "什么是人工智能",
                  note: {
                    create: {
                      content: "## 学习笔记\n\n在这里记录视频重点、代码片段和复习问题。"
                    }
                  }
                }
              ]
            }
          }
        ]
      }
    }
  });

  for (const tag of [
    { name: "机器学习", color: "#2563eb" },
    { name: "Prompt", color: "#16a34a" },
    { name: "Python", color: "#dc2626" }
  ]) {
    await prisma.tag.upsert({
      where: { name: tag.name },
      update: tag,
      create: tag
    });
  }

  await prisma.task.create({
    data: {
      title: "整理第一章核心概念",
      status: "todo",
      courseId: course.id
    }
  });
}

main().finally(async () => {
  await prisma.$disconnect();
});
