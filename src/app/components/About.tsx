import { motion } from "motion/react";
import { Code2, Sparkles, Rocket } from "lucide-react";

export function About() {
  const features = [
    {
      icon: Code2,
      title: "Développement",
      description: "Création d'applications web modernes avec les dernières technologies",
    },
    {
      icon: Sparkles,
      title: "Design",
      description: "Interface utilisateur élégante et intuitive pour une expérience optimale",
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Code optimisé et bonnes pratiques pour des applications rapides",
    },
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">À propos de moi</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Je suis étudiant en informatique avec une passion pour le développement web.
            J'apprends constamment de nouvelles technologies et j'aime créer des projets
            qui combinent créativité et fonctionnalité.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                <feature.icon size={32} />
              </div>
              <h3 className="mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}