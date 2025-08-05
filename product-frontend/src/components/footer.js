export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white text-center p-4 mt-10 shadow-inner">
      © {new Date().getFullYear()} Products. All rights reserved.
    </footer>
  )
}
