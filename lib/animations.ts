export const premiumEase = [0.22, 1, 0.36, 1] as const

export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 32,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: premiumEase,
    },
  },
}

export const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -32,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: premiumEase,
    },
  },
}

export const fadeRight = {
  hidden: {
    opacity: 0,
    x: 32,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: premiumEase,
    },
  },
}

export const scaleReveal = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.96,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      ease: premiumEase,
    },
  },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
}
