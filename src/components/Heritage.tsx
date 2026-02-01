import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import artisanImage from '@/assets/artisan-jewelry.jpg';
import { stats } from '@/data/products';

export default function Heritage() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="section-padding bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-lg overflow-hidden">
              <img
                src={artisanImage}
                alt="Master Artisan at Work"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Border */}
            <div className="absolute -inset-4 border border-gold/20 rounded-lg -z-10" />
          </motion.div>

          {/* Content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-label text-gold mb-4"
            >
              Our Heritage
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="heading-section text-foreground mb-6"
            >
              Where Tradition Meets Modern Artistry
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-4 text-muted-foreground mb-10"
            >
              <p className="leading-relaxed">
                Since 1985, AuraAntique has been at the forefront of preserving the timeless 
                beauty of antique jewelry while infusing it with contemporary elegance. Our 
                master artisans combine centuries-old techniques with modern precision to create 
                pieces that are both historically inspired and uniquely individual.
              </p>
              <p className="leading-relaxed">
                Each piece in our collection is handcrafted using ethically sourced gemstones 
                and precious metals, ensuring that every creation tells a story of heritage, 
                quality, and enduring beauty.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              ref={ref}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <div className="stat-value mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
