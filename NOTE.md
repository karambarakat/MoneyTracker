$ pnpm -r exec pwd | xargs -I {{}} -n 1 -- cp {{}}/package.json $(pwd | sed -e "s/{{}}/{{}}oute/")/package.json