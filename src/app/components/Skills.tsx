import { motion } from "motion/react";

export function Skills() {
  const skills = [
    { name: "Python", level: 85 },
    { name: "C++", level: 75 },
    { name: "React", level: 70 },
    { name: "TypeScript", level: 65 },
    { name: "Node.js", level: 60 },
    { name: "Python", level: 80 },
    { name: "Git", level: 75 },
    { name: "SQL", level: 70 },
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Compétences</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Voici les technologies et outils que j'utilise dans mes projets
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                  <span className="text-gray-500 dark:text-gray-400">{skill.level}%</span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}