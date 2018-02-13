# TypeScript OData client

This package wraps the [axios](https://github.com/axios/axios) http client library with methods to easily handle OData v4 endpoints.

## Installation

```sh
npm install https://github.com/zhevron/odata.git --save
```

## Usage

### Getting entities from an endpoint

```typescript
import { ODataClient } from "odata";

interface IProduct {
    ID: number;
    Name: string;
    Description: string;
}

const client = new ODataClient("http://services.odata.org/Experimental/OData/OData.svc/");
const response = await client.get<IProduct>("Products").execute();

const products = response.entities;
```

### Getting a single entity from an endpoint
```typescript
import { ODataClient } from "odata";

interface IProduct {
    ID: number;
    Name: string;
    Description: string;
}

const id = 0;

const client = new ODataClient("http://services.odata.org/Experimental/OData/OData.svc/");
const response = await client.get<IProduct>("Products", id).execute();

const product = response.entity;
```

## License

Licensed under either of

 * Apache License, Version 2.0 ([LICENSE-APACHE](LICENSE-APACHE) or http://www.apache.org/licenses/LICENSE-2.0)
 * MIT license ([LICENSE-MIT](LICENSE-MIT) or http://opensource.org/licenses/MIT)

at your option.

### Contribution

Unless you explicitly state otherwise, any contribution intentionally submitted
for inclusion in the work by you, as defined in the Apache-2.0 license, shall be dual licensed as above, without any
additional terms or conditions.
