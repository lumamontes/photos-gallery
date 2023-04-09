import Container from "../container";

export default function Footer(props) {
  return (
    <Container className="mt-10 border-t border-gray-100 dark:border-gray-800">
      <div className="text-sm text-center">
        Copyright © {new Date().getFullYear()} {props?.copyright}. All
        rights reserved.
      </div>
      <div className="flex justify-center gap-1 mt-1 text-sm text-center text-gray-500 dark:text-gray-600">
         Com ❤️ por  <a href="https://github.com/lumamontes" target="_blank" className="hover:to-blue-500">Luma</a>
      </div>
    </Container>
  );
}