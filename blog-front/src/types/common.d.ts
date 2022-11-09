declare type Override<T, K extends { [P in keyof T]?: K[P] }> = Omit<
  T,
  keyof K
> &
  K;

type DeepReadonly<T> = {
  readonly [key in keyof T]: T[key] extends object
    ? T[key] extends (infer P)[]
      ? readonly P[]
      : DeepReadonly<T[key]>
    : T[key];
};

declare type AllNullable<T> = {
  [K in keyof T]: T[K] | null;
};

declare type DeepAllNullable<T> = {
  [K in keyof T]: T[K] extends (infer A)[]
    ? (A | null)[] | null
    : T[K] extends object
    ? DeepAllNullable<T[K]> | null
    : T[K] | null;
};

declare type DeepNullableReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? T[K] extends (infer A)[]
      ? readonly (A | null)[] | null
      : DeepNullableReadonly<T[K]> | null
    : T[K] | null;
};

declare type AllOptional<T> = {
  [K in keyof T]?: T[K];
};

declare type ImageFileNode = {
  file: {
    childImageSharp: {
      gatsbyImageData: import("gatsby-plugin-image").IGatsbyImageData;
    };
  };
};

declare type Frontmatter = {
  readonly title: string;
  readonly slug: string;
  readonly category: readonly string[];
  readonly date: string;
};
